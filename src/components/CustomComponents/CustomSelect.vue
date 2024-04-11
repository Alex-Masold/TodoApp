<template>
  <div>
    <select class="select" 
      :value="modelValue"
      @change="changeOPtion">
      <option v-for="option in props.options" 
        :key="option.value" 
        :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { option } from '@/models/Option';

const emit = defineEmits(['update:modelValue']);


const props = defineProps({
  modelValue: { // надо исправить на defineModel
    type: String,
    required: true, 
  },
  options: {
    type: Array<option>,
    default: () => []
  }
});

function changeOPtion(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
}
</script>

<style scoped>
    .select{
        color: teal;
        background-color:#242424;
        border: 2px solid teal;
        padding: 10px 15px;
    }
</style>
