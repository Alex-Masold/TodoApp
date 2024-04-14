<template>
  <div class="wrapper">
    <TodoInput @create-task="handleTaskCreate" @change-list="changeList" />
    <TodoList :todoes="tasks" 
      @delete-task="handleTaskDelete" 
      @complete-task="handleTaskComplete"
      @restore-task="handleTaskRestore"/>
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

function changeList(value: string) {
  currentList.value = value;
}

function handleTaskCreate(value: string) {
  activeTasks.value.push(new task(activeTasks.value.length + deletedTasks.value.length + completedTasks.value.length + 1 , value));
}

function handleTaskDelete(id: number) {
  let task: task = tasks.value.find(item => item.id === id) as task;
  //console.log(task.isDeleted);
  if(task.isDeleted === false) {
    task.isDeleted = true;
    deletedTasks.value.push(task);
    activeTasks.value = activeTasks.value.filter(item => item.id !== id);
  } else {
    deletedTasks.value = deletedTasks.value.filter(item => item.id !== id);
  }
} 

function handleTaskComplete(id: number) {
  let task: task = activeTasks.value.find(item => item.id === id) as task;
  //console.log(task.isCompleted);
  if(task.isCompleted === false) {
    task.isCompleted = true;
    completedTasks.value.push(task);
    activeTasks.value = activeTasks.value.filter(item => item.id !== id);
  }
}

function handleTaskRestore(id: number){
  let task: task = deletedTasks.value.find(item => item.id === id) as task;
  //console.log(task.isDeleted);
  if(task.isDeleted === true) {
    task.isDeleted = false;
    activeTasks.value.push(task);
    deletedTasks.value = deletedTasks.value.filter(item => item.id !== id);
  }
}


</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  min-width: 400px;
  background: #222;
  margin-right: 1rem;
  margin-left: 1rem;
  padding: 1.5em 2em;
  overflow: hidden;
  border-radius: 30px;
  border: 3px solid teal;
  font-family: 'Roboto', sans-serif;
  transition: 0.5s ease-out;
}
</style>
