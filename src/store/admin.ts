import { defineStore } from 'pinia'
import { refs } from "@/firebase-setup"
import { Contract, ContractData } from "@/models/Contract"
import { Customer, CustomerData } from "@/models/Customer"
import {
  collection, collectionGroup, addDoc, serverTimestamp, query, where,
  getDocs, setDoc, doc, Timestamp, Index
} from "firebase/firestore"
import { indexedDB } from '@/indexed-db-setup'
import { ref } from 'vue'
import { DocumentMetadata } from '@/models/FirestoreDocument'
import { WhereClause } from 'dexie'

// TODO: refactor
type Models = {
  customers: Customer
  contracts: Contract
}
type Indexes = {
  customers: typeof Customer.indexes
  contracts: typeof Contract.indexes
}

export type FetchOptions<
  Collection extends keyof Models,
  SearchIndex extends keyof Indexes[Collection]
> = {
  skip?: number
  limit?: number
  search?: {
    key: SearchIndex,
    method: 'equals' | 'startsWith' | 'equalsIgnoreCase' | 'startsWithIgnoreCase',
    value: Indexes[Collection][SearchIndex]
  }
  sortBy?: {
    key: SearchIndex
    order: 'asc' | 'desc'
  }
}

export const useAdminStore = defineStore('admin', () => {
  const customers = ref<Customer[]>([])
  const contracts = ref<Contract[]>([])
  const lastFetchTimestamp = ref(Timestamp.fromMillis(0))
  const isInitialized = ref(false)

  init()
    
  async function init() {
    lastFetchTimestamp.value = await indexedDB.retrieveLastFetchTimestamp()
    customers.value = await fetchCustomersFromLocalCache()
    isInitialized.value = true
  }

  //TODO: make types stricter
  async function fetch<I extends {[k in keyof Models]: keyof Indexes[k]}>(
    options?: {
      customers?: FetchOptions<'customers', I['customers']>,
      contracts?: FetchOptions<'contracts', I['contracts']>,
    }
  ) {
    if (!isInitialized.value)
      await init()
    const { addedCustomers } = await fetchFromFirestore()
    await updateLocalCache(addedCustomers)
    customers.value = await fetchCustomersFromLocalCache(options?.customers)
  }

  async function fetchFromFirestore() {
    const snapshots = await Promise.all([
      getDocs(query(refs.customers,
        where('editedAt', '>', lastFetchTimestamp.value)
      )),
      // getDocs(query(refs.contracts,
      //   where('editedAt', '>', lastFetchTimestamp.value)
      // )),
    ])
    lastFetchTimestamp.value = Timestamp.now()
    console.log('lastFetchTimestamp.value', lastFetchTimestamp.value.toDate())
    
    return { addedCustomers: snapshots[0].docs.map(snap => snap.data()), }
  }

  async function updateLocalCache(addedCustomers: Customer[]) {
    await indexedDB.customers.bulkPut(addedCustomers)
    await indexedDB.storeLastFetchTimestamp(lastFetchTimestamp.value)
  }

  //TODO: replace startsWith with include.
  async function fetchCustomersFromLocalCache<I extends keyof Indexes['customers']>(options?: FetchOptions<'customers', I>) {
    const defaults = {
      skip: 0,
      limit: Infinity,
      search: { key: 'id', method: 'startsWithIgnoreCase', value: '' },
      sortBy: { key: 'editedAt.seconds', order: 'desc' }
    } as const
    const { skip, limit, search, sortBy } = { ...defaults, ...options }

    return (await indexedDB.customers
      .where(search.key)[search.method](search.value?.toString() || '')
      .offset(skip)
      .limit(limit)
      .sortBy(sortBy.key))
  }

  async function addCustomer(customer: Customer) {
    await addDoc(refs.customers, customer)
    await fetch()
  }

  async function updateCustomer(customer: Customer) {
    await setDoc(customer.getRef(), customer)
    await fetch()
  }

  return { 
    customers, contracts, lastFetchTimestamp, isInitialized, 
    fetch, addCustomer, updateCustomer 
  }
})