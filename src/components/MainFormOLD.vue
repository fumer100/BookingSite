<template>
  <v-form fast-fail @submit.prevent>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstName"
            :rules="nameRules"
            label="Vorname"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastName"
            :rules="nameRules"
            label="Nachname"
            required
          ></v-text-field>
        </v-col>
      </v-row>
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
      
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              v-model="phoneNumber"
              :rules="phoneNumberRules"
              label="Telefon Nr."
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col 
          cols="2"
          md="5"
          lg="5"
          >
            <button type="button" @click="submit">Speichern</button>
          </v-col>
      </v-row>
    </v-container>
    
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAdminStore } from '@/store/admin'
import { Customer } from "@/models/Customer"
// import { CustomerData, validationRules as customerRules } from "@/models/Customer"
// import { FormGroup, TextField } from "./FirestoreDocumentForms"
// import { useI18n } from "vue-i18n"

// const { t } = useI18n()
const store = useAdminStore()


const firstName = ref("")
const lastName = ref("")
const email = ref("")
const phoneNumber = ref("")
const nameRules = [
  (value: any) => {
        if (value) return true

        // return t('mainForm.required')
        return 'nicht gut'
      },
      
  (value: string | any[]) => {
        if (value?.length <= 10) return true

        return 'Der Name darf nur bis 10 Buchstaben haben.'
      },
    ]

const emailRules = [ 
  (value: string ) => {
        if (!value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return 'E-mail muss valide sein'
        
        return true
      }
    ]  
const phoneNumberRules = [ 
  (value: string ) => {
    
    if (value.match( /^\d{11}$/)) {
      return true
    } else {
      return 'Bitte eine korrekte Telefonnummer in Form von 01741238358'
    }
      }
    ]  

function submit() {
  const customer = new Customer({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value
  })
  store.addCustomer(customer)
}
</script>