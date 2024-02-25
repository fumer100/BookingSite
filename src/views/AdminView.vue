<template>
   <div class="d-flex flex-row">
        <v-tabs
          v-model="tab"
          direction="vertical"
          color="primary"
        >
          <v-tab value="option-1">
            <v-icon start>
              mdi-account-multiple
            </v-icon>
            Kunden
          </v-tab>
          <v-tab value="option-2">
            <v-icon start>
              mdi-calendar-check-outline
            </v-icon>
            Aufträge
          </v-tab>
          <v-tab value="option-3">
            <v-icon start>
              mdi-toolbox-outline
            </v-icon>
            Dienstleistungen
          </v-tab>
          <v-tab value="option-4">
            <v-icon start>
              mdi-toolbox-outline
            </v-icon>
              oldAdminPanel
          </v-tab>
        </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="option-1">
              <CustomerTable />
            </v-window-item>
            <v-window-item value="option-2">
            </v-window-item>
            <v-window-item value="option-3">
            </v-window-item>
            <v-window-item value="option-4">
              <AdminPanel />
            </v-window-item>
        </v-window>
   </div>
</template>

<script lang="ts" setup>
  import CustomerTable from '@/components/CustomerTable.vue'
  import AdminPanel from '@/views/AdminPanel.vue'
  import { ref } from 'vue'
  const tab = ref('option-1')

</script>