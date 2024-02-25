<template>
    <h1>Kunden: </h1>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    ID
                </th>
                <th class="text-left">
                    editedAt
                </th>
                <th class="text-left">
                    Vorname
                </th>
                <th class="text-left">
                    Nachname
                </th>
                <th class="text-left">
                    Email
                </th>
                <th class="text-left">
                    Telefonnummer
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(customer) in store.customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.editedAt?.toDate() }}</td>
                <td>{{ customer.data.firstName }}</td>
                <td>{{ customer.data.lastName }}</td>
                <td>{{ customer.data.email }}</td>
                <td>{{ customer.data.phoneNumber }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
import { useAdminStore } from '@/store/admin'
import { onMounted } from 'vue'

const store = useAdminStore()
onMounted(() => {
    store.fetch()
})
</script>
