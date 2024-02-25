<template>
  <v-container>
    <slot :fields="fields"></slot>
  </v-container>
</template>

<script lang="ts">
type Fields<Data extends DocumentData = DocumentData> = {
  [key in keyof Data]: {
    label: string,
    rules: ValidationRules<Data>[key],
    fieldValue: Data[key],
    updateFieldValue: (v: Data[key]) => void,
  }
}
export type Field = Fields[keyof Fields]
</script>

<script setup lang="ts" generic="Data extends DocumentData">
import { ValidationRules } from '@/models/FirestoreDocument';
import { DocumentData } from 'firebase/firestore';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: Data,
  validationRules: ValidationRules<Data>
}>()
const emit = defineEmits(['update:modelValue'])

const fields = computed(() => 
  Object.fromEntries(Object.entries(props.modelValue).map(
    ([key, value]) => 
      [key, {
        label: key,
        rules: props.validationRules[key],
        fieldValue: value,
        updateFieldValue: (v: typeof value) => 
          emit('update:modelValue', { ...props.modelValue, [key]: v }),
      }]
  )
) as unknown as Fields<Data>)


</script>