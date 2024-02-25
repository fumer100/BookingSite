// import { firestore } from "./firebase-setup";
// import { collection, addDoc, serverTimestamp, query, where, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
// import { ContractData } from "./models/Contract";
// import { CustomerData } from "./models/Customer";

// async function getContract(id: string) {
//   const snapshot = await getDoc(doc(firestore, "contracts", id));
//   if (snapshot.exists()) {
//     return snapshot.data() as ContractData;
//   } else {
//     throw new Error("Contract not found.");
//   }
// }

// /**
//  * adds {@link ContractData.createdAt} field to {@link data} and saves it to firestore
//  * @returns the id of the newly created document
//  */
// async function addContract(data: Omit<ContractData, "createdAt">) {
//   return (await addDoc(collection(firestore, "contracts"), {
//     ...data,
//     createdAt: serverTimestamp()
//   })).id;
// }

// async function getCustomer(id: string) {
//   const snapshot = await getDoc(doc(firestore, "customers", id));
//   if (snapshot.exists()) {
//     return snapshot.data() as CustomerData;
//   } else {
//     throw new Error("Customer not found.");
//   }
// }

// async function getAllCustomers() {
//   const snapshot = await getDocs(collection(firestore, "customers"));
//   return snapshot.docs.map(d => d.data()) as CustomerData[];
// }

// /**
//  * @returns the id of the newly created document
//  */
// async function addCustomer(data: CustomerData) {
//   const customersRef = collection(firestore, "customers")
//   const snapshot = await getDocs(query(customersRef,
//     where("email", "==", data.email),
//     where("firstName", "==", data.firstName),
//     where("lastName", "==", data.lastName)
//   ));

//   // TODO: save the customer's old data (in a separate collection?) instead of overwriting it
//   if (snapshot.empty) {
//     return (await addDoc(customersRef, data)).id;
//   } else {
//     const existingCustomer = snapshot.docs[0];
//     setDoc(existingCustomer.ref, data);
//     return existingCustomer.id;
//   }
// }

// export { getContract, addContract, getCustomer, addCustomer, getAllCustomers };