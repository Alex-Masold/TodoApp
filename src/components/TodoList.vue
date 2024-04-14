<template>
  <div>
    <TodoItem
      v-for="todo in props.todoes"
      :key="todo.id"
      :todo="todo"
      v-model="todo.title"
      @delete-task="handleDeleteTodo"
      @complete-task="handleCompleteTodo" 
      @restore-task="handleRestoreTodo"/>
  </div>
</template>

<script setup lang="ts">
import { task } from '../models/Task';
import TodoItem from './TodoItem.vue';

const emit = defineEmits(['delete-task', 'complete-task', 'restore-task']);

function handleDeleteTodo(id: string) {
  emit('delete-task', id);
}

function handleCompleteTodo(id: string) {
  emit('complete-task', id);
}

function handleRestoreTodo(id: string) {
  emit('restore-task', id);
}
const props = defineProps({
  todoes: {
    type: Array<task>,
    required: true
  }
});
</script>

<style scoped></style>
