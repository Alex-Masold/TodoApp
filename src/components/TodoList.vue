<template>
  <div>
    <TodoItem v-for="todo in props.todoes" 
        :key="todo.id" 
        :todo="todo"
        v-model="todo.title"
        @delete-todo="handleDeleteTodo"
        @complete-todo="handleCompleteTodo"/>
  </div>
</template>

<script setup lang="ts">
import { task } from '../models/Task';
import TodoItem from './TodoItem.vue';

const emit = defineEmits(['delete-todo', 'complete-todo']);

function handleDeleteTodo(id: string) {
    emit('delete-todo', id);
}

function handleCompleteTodo(id: string) {
    emit('complete-todo', id);
}

const props = defineProps({
    todoes:{
        type: Array<task>,
        required: true,
    }
})


</script>

<style scoped>

</style>
