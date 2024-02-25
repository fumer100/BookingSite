<template>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" 
        :headers="headers"
        :items-length="(totalItems as number)" 
        :items="store.customers.map(customer => customer.toJSON())"
        :loading="loading" class="elevation-1" item-value="email"
        @update:options="loadItems">
        <template v-slot:tfoot>
            <tr>
                <td>
                    <v-text-field v-model="name" hide-details placeholder="Search name..." class="ma-2"
                        density="compact"></v-text-field>
                </td>

            </tr>
        </template>
    </v-data-table-server>
</template>
<script setup lang="ts">
import { ContractData } from '@/models/Contract'
import { CustomerData } from '@/models/Customer'
import { DocumentMetadata } from '@/models/FirestoreDocument'
import { useAdminStore } from '@/store/admin'
import { ref, watch } from 'vue'
const store = useAdminStore()

const itemsPerPage = ref(2)
const headers = ref<any[]>([
    {
        title: 'Email',
        align: 'start',
        sortable: false,
        key: 'email',
    },
    { title: 'firstName', key: 'firstName', align: 'end' },
    { title: 'lastName', key: 'lastName', align: 'end' },
    { title: 'phoneNumber', key: 'phoneNumber', align: 'end' },

])
const loading = ref(true)
const totalItems = ref<Number>(50)
const name = ref('')
const search = ref('')
async function loadItems({ page, itemsPerPage, sortBy }: {
    page: number,
    itemsPerPage: number,
    sortBy: {
        key: keyof (CustomerData),
        order: 'asc' | 'desc',
    },
}) {
    loading.value = true
    await store.fetch({customers: {limit: itemsPerPage, skip: (page - 1) * itemsPerPage, sortBy: {key: `data.${sortBy.key}`, order: sortBy.order}}})
    loading.value = false
}
watch(name, () => {
    search.value = String(Date.now())
})
</script>