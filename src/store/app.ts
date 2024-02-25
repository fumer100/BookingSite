import { Contract } from "@/models/Contract";
import { Customer } from "@/models/Customer";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useAppStore = defineStore('app', () => {
  const currentCustomer = ref<Customer>(
    new Customer(Customer.defaultData())
  )
  const currentContract = ref<Contract>(
    new Contract(currentCustomer.value.id, Contract.defaultData())
  )

  

  

  return { currentCustomer, currentContract }
})