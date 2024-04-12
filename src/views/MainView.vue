<template>
  <div class="wrapper">
    <TodoInput @create-task="handleItemCreate" @change-list="changeList" />
    <TodoList :todoes="tasks" @delete-todo="handleItemDelete" @complete-todo="handleItemComplete"/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { task } from '@/models/Task';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

const currentList = ref<string>('active');

const activeTasks = ref<Array<task>>([
  new task(1, 'Todo1'),
  new task(2, 'Todo2'),
  new task(3, 'Todo3'),
  new task(4, 'Todo4'),
  new task(5, 'Todo5'),
  new task(6, 'Todo6')
]);

const completedTasks = ref<Array<task>>([]);

const deletedTasks = ref<Array<task>>([]);

const tasks = computed(() => {
  switch (currentList.value) {
    case 'deleted':
      return deletedTasks.value;
    case 'completed':
      return completedTasks.value;
    default:
      return activeTasks.value;
  }
});

function handleItemCreate(value: string) {
  activeTasks.value.push(new task(activeTasks.value.length + deletedTasks.value.length + completedTasks.value.length + 1 , value));
}

function handleItemDelete(id: number) {
  deletedTasks.value.push(activeTasks.value.find(item => item.id === id) as task);
  activeTasks.value = activeTasks.value.filter(item => item.id !== id);
}

function handleItemComplete(id: number) {
  completedTasks.value.push(activeTasks.value.find(item => item.id === id) as task);
  activeTasks.value = activeTasks.value.filter(item => item.id !== id);
}

function changeList(value: string) {
  currentList.value = value;
}

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
</style>
