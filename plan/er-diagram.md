```mermaid
erDiagram 
  customers {
    string firstName
    string lastName
    Date birthdate
    string gender
    string email
    string phone
    Address address
    Date createdAt
    Date editedAt
  }
  contracts {
    string description
    string status
    string service
    int price
    Date createdAt
    Date editedAt
  }

  Address {
    string state
    string city
    string zip
    string street
    string houseNumber
  }
  
  customers ||--o{ contracts : order
```