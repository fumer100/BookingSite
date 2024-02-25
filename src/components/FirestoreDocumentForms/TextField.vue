<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-text-field 
        :label="props.field.label"
        :rules="props.field.rules" 
        :model-value="props.field.fieldValue"
        @update:model-value="v => props.field.updateFieldValue(v)"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Field } from './FormGroup.vue';

const props = defineProps<{
  field: Field,
}>()


</script>