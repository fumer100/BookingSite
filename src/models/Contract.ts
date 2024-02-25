import { doc } from "firebase/firestore"
import { refs } from '@/firebase-setup'
import { DocumentMetadata, FirestoreDocument, ValidationRules } from './FirestoreDocument'
import { maxLength, minLength, required } from "@/validators"

export interface ContractData {
  description: string
}

export class Contract extends FirestoreDocument<ContractData> {
  readonly customerId: string

  static indexes: typeof FirestoreDocument.indexes & Partial<{
    [key in keyof ContractData as `data.${key}`]: ContractData[key]
  }> = {
      ...super.indexes,
      'data.description': "",
    }

  // constructor isn't called when retrieving data from Dexie.
  constructor(customerId: string, data: ContractData, metadata?: DocumentMetadata) {
    if (metadata) {
      super(data, metadata.id, metadata.editedAt, metadata.createdAt)
    } else {
      super(data, doc(refs.contractsOf(customerId)).id)
    }
    this.customerId = customerId
  }

  getRef() {
    return doc(refs.contractsOf(this.customerId), this.id)
  }

  getValidationRules(): ValidationRules<ContractData> {
    return {
      description: [required(), minLength(1), maxLength(255)],
    }
  }

  static defaultData(): ContractData {
    return {
      ...super.defaultData(),
      description: "",
    }
  }
}