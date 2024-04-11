<template>
  <div class="todo-input">
    <div class="wrapper">
      <CustomInput v-model="taskTitle" />
    </div>
    <CustomButton @click="handleCreateTask">Add</CustomButton>
    <CustomSelect v-model="selectedList" :options="options" @change="changeList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { option } from '@/models/Option';
import CustomInput from './CustomComponents/CustomInput.vue';
import CustomButton from './CustomComponents/CustomButton.vue';
import CustomSelect from './CustomComponents/CustomSelect.vue';

const options = ref<Array<option>>([
  new option('Активные', 'active'),
  new option('Выполненные', 'completed'),
  new option('Удаленные', 'deleted')
]);

const emit = defineEmits(['create-task', 'change-list']);

const selectedList = ref<string>('active');
const taskTitle = ref<string>('');

function handleCreateTask() {
  if (!taskTitle.value) return;

  emit('create-task', taskTitle.value);

  taskTitle.value = '';
}

function changeList() {
  emit('change-list', selectedList.value);
}
</script>

<style scoped>
.todo-input {
  display: flex;
  gap: 0.5em;
  align-items: baseline;
  justify-content: center;
}
.input {
  border: 2px solid teal;
  background-color: #222;
}
</style>
