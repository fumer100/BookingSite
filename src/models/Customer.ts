import { doc } from 'firebase/firestore'
import { refs } from '@/firebase-setup'
import { 
  DocumentMetadata, FirestoreDocument, ValidationRules
} from './FirestoreDocument'
import { required, email, maxLength, minLength } from '@/validators'


export interface CustomerData {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender : string
  birthdate: Date
  state : string
  city : string
  street : string
  houseNumber : string
  zip : string
}

// TODO: remove defaultData() and initialize properties directly
export class Customer extends FirestoreDocument<CustomerData> {
  static indexes: typeof FirestoreDocument.indexes & Partial<{
    [key in keyof CustomerData as `data.${key}`]: CustomerData[key]
  }> = {
    ...super.indexes,
    'data.firstName': "",
    'data.lastName': "",
    'data.email': "",
    'data.phoneNumber': "",
  }

  // constructor isn't called when retrieving data from Dexie.
  constructor(data: CustomerData, metadata?: DocumentMetadata) {
    if (metadata) {
      super(data, metadata.id, metadata.editedAt, metadata.createdAt)
    } else {
      super(data, doc(refs.customers).id)
    }
  }

  getRef() {
    return doc(refs.customers, this.id)
  }

  // TODO: use decorator to cache validation rules
  getValidationRules(): ValidationRules<CustomerData> {
    return {
      firstName: [required(), minLength(2), maxLength(10)],
      lastName: [required(), minLength(2), maxLength(10)],
      email: [ // TODO: remove second function
        email(),
        email => email.startsWith(this.data.firstName) 
          ? true 
          : "Email must start with first name"
      ], 
      phoneNumber: [minLength(9), maxLength(16)],
      gender: [minLength(9), maxLength(16)],
      birthdate: [],
      state: [],
      city: [],
      street: [],
      houseNumber: [],
      zip: []
    }
  }

  static defaultData(): CustomerData {
    return {
      ...super.defaultData(),
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender : "",
      birthdate: new Date("01.07.2000"),
      state : "",
      city : "",
      street : "",
      houseNumber : "",
      zip : "",
    }
  }
}