import Dexie, { Table } from 'dexie'
import { Customer } from './models/Customer'
import { Contract } from './models/Contract'
import { Timestamp } from 'firebase/firestore'

type MiscData = {
  id: 0,
  lastFetchTimestamp: { seconds: number, nanoseconds: number },
  filter: string
}


export class SubClassedDexie extends Dexie {
  customers!: Table<Customer, string> // string is primary key type
  contracts!: Table<Contract, string>
  misc!: Table<MiscData, 0>

  constructor() {
    super('adminDatabase')
    this.version(5).stores({
      // '<primary key>, <index1>, <index2>, ...'
      customers: Object.keys(Customer.indexes).join(','),
      contracts: Object.keys(Contract.indexes).join(','),
      misc: 'id'
    })
    this.customers.mapToClass(Customer)
    this.contracts.mapToClass(Contract)
    Dexie.delete('appDatabase')
    this.init()
  }

  init() {
    this.on('populate', () => {
      this.misc.put({ 
        id: 0, 
        lastFetchTimestamp: Timestamp.fromMillis(0).toJSON(), 
        filter: '' 
      })
    })
  }

  async retrieveLastFetchTimestamp() {
    const t = (await this.misc.get(0))!.lastFetchTimestamp
    return new Timestamp(t.seconds, t.nanoseconds)
  }
  async storeLastFetchTimestamp(timestamp: Timestamp) {
    await this.misc.update(0, {
      lastFetchTimestamp: timestamp.toJSON()
    })
  }
}

export const indexedDB = new SubClassedDexie()
