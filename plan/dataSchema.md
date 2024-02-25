```mermaid
---
title: Data Schema
---
classDiagram
  <!-- TODO: bad scheme. update. -->
  class FirestoreDocument {
    +string id
    +Date createdAt
    +Date editedAt
    +string collectionId
    +FirestoreDocument()
    +fromFirestore(DocumentSnapshot doc) FirestoreDocument$
    +validationRules() Function[]

  }

  class CustomerData {
    <<interface>>
    +string name
    +string email
    ...
  }

  class Customer {
    +CustomerData data
    +Customer(CustomerData data)
    +fromFirestore(DocumentSnapshot doc) Customer$
    +validationRules() Function[] 
  }

   class ContractData {
    <<interface>>
    +string service
    +string status
    ...
  }

  class Contract {
    +ContractData data
    +Contract(contractData data)
    +fromFirestore(DocumentSnapshot doc) Contract$
    +validationRules() Function[] 
  }

  
  FirestoreDocument <-- Customer
  FirestoreDocument <-- Contract

```