import {
  DocumentReference, serverTimestamp, DocumentData, Timestamp,
} from "firebase/firestore"

export type ValidationRules<Data extends DocumentData> = {
  [key in keyof Data]: ((value: Data[key]) => string | boolean)[]
}

export interface DocumentMetadata {
  id: string
  editedAt: Timestamp
  createdAt: Timestamp
}

export abstract class FirestoreDocument<Data extends DocumentData=DocumentData> {
  readonly data: Data
  readonly id: string
  readonly editedAt?: Timestamp
  readonly createdAt?: Timestamp

  static indexes = {
    'id': '',
    'editedAt.seconds': 0,
    'createdAt.seconds': 0,
  }

  // constructor isn't called when retrieving data from Dexie.
  constructor(data: Data, id: string, editedAt?: Timestamp, createdAt?: Timestamp) {
    this.data = data
    this.id = id
    this.editedAt = editedAt
    this.createdAt = createdAt
  }

  static defaultData() {
    return {}
  }

  abstract getRef(): DocumentReference

  abstract getValidationRules(): ValidationRules<Data>

  validate() {

  }

  toJSON() {
    return {
      ...this.data,
      id: this.id,
      editedAt: this.editedAt,
      createdAt: this.createdAt,
    }
  }

  toFirestoreData()  {
    return {
      ...this.data,
      createdAt: this.createdAt ?? serverTimestamp(),
      editedAt: serverTimestamp(),
    }
  }
}