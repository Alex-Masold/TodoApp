<template>
  <div>
    <TodoItem v-for="todo in props.todoes" 
        :key="todo.id" 
        :todo="todo"
        v-model="todo.title" />
  </div>
</template>

<script setup lang="ts">
import { task } from '../models/Task';
import TodoItem from './TodoItem.vue';

const props = defineProps({
    todoes:{
        type: Array<task>,
        required: true,
    }
})


</script>

<style scoped>

</style>
