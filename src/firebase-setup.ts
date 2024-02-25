import { initializeApp } from 'firebase/app'
import { 
  FirestoreDataConverter, collection, collectionGroup, getFirestore 
} from 'firebase/firestore'
import { Customer, CustomerData } from './models/Customer'
import { DocumentMetadata } from './models/FirestoreDocument'

const firebaseConfig = {
  apiKey: 'AIzaSyDoEszzbQnjvvJuCh9dTMCoVxS52U87RRo',
  authDomain: 'f-website-dev.firebaseapp.com',
  projectId: 'f-website-dev',
  storageBucket: 'f-website-dev.appspot.com',
  messagingSenderId: '433435606067',
  appId: '1:433435606067:web:5a6aa03e2eb9c3886bb746',
  measurementId: 'G-J4KXEBB3FJ'
}
const app = initializeApp(firebaseConfig)

type CollectionName = 'customers' | 'contracts'

const firestore = getFirestore(app)
const customersConverter: FirestoreDataConverter<
  Customer, CustomerData & Omit<DocumentMetadata, 'id'>
> = {
  toFirestore: (customer: Customer) => {
    return customer.toFirestoreData()
  },
  fromFirestore: (snapshot, options) => {
    const { createdAt, editedAt, ...data } = snapshot.data(options)
    return new Customer(data as CustomerData, {
      id: snapshot.id,
      editedAt: editedAt,
      createdAt: createdAt,
    })
  }
}

//TODO: use CollectionName type.
const refs = {
  customers: collection(firestore, 'customers')
    .withConverter(customersConverter),
  contracts: collectionGroup(firestore, 'contracts'),
  contractsOf: (customerId: string) => 
    collection(firestore, 'customers', customerId, 'contracts'),
}

export { firestore, refs, customersConverter, CollectionName }