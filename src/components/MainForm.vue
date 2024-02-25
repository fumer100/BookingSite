<template>
  <v-form fast-fail @submit.prevent>
    <form-group 
      v-model="customer.data"
      :validation-rules="customer.getValidationRules()"
      v-slot="{fields}"
    >
      <text-field :field="fields.firstName" />
      <text-field :field="fields.lastName" />
      <text-field :field="fields.email" />
      <text-field :field="fields.gender" />
      <text-field :field="fields.birthdate" />
      <text-field :field="fields.state" />
      <text-field :field="fields.city" />
      <text-field :field="fields.street" />
      <text-field :field="fields.houseNumber" />
      <text-field :field="fields.zip" />
    </form-group>
    <v-row justify="end">
      <v-col cols="2" md="5" lg="5">
        <button type="button" @click="console.log(customer)">enter</button>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { Customer } from "@/models/Customer"
import { FormGroup, TextField } from "./FirestoreDocumentForms"

const customer = ref<Customer>(new Customer(Customer.defaultData()))

</script>