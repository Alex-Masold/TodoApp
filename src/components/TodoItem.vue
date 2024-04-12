<template>
  <div class="todo-item">
    <span> {{ props.todo.id }} </span>
    <div :class="{ completed: isCompleted }" type="text" v-if="!isEdit"  @click="handleCompleteTodo" @dblclick="handleEditTodo">
      {{ props.todo.title }}
    </div>
    <CustomTextarea class="edit" v-else v-focus v-model="modelValue" @click.stop="handleEditTodo" />
    <div class="button-container">
      <CustomButton @click="handleDeleteTodo"> Delete </CustomButton>
      <CustomButton v-show="!props.isDeleted && !isCompleted" @click="handleEditTodo"> Edit </CustomButton>
      <CustomButton v-show="props.isDeleted"> Restore </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { task } from '@/models/Task';
import CustomButton from './CustomComponents/CustomButton.vue';
import CustomTextarea from './CustomComponents/CustomTextarea.vue';

const props = defineProps({
  todo: {
    type: task,
    required: true
  },
  isDeleted: {
    type: Boolean
  }
});

const isCompleted = ref<boolean>(false);

const isEdit = ref<boolean>(false);

const modelValue = defineModel<string>();

const emit = defineEmits(['delete-todo', 'complete-todo', 'restore-todo']); // вообще надо покумекать над computed

function handleDeleteTodo() {
  emit('delete-todo', props.todo.id); // если isDeleted = true, то мягко удаляет, если isDeleted = false, то немягко удаляет
}

function handleCompleteTodo() {
  if (props.isDeleted === false && isCompleted.value === false) {
    isCompleted.value = !isCompleted.value;
    emit('complete-todo', props.todo.id);
  }
}

function handleEditTodo() {
  if (props.isDeleted === false && isCompleted.value === false){
    isEdit.value = !isEdit.value;
  }
}

</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1em;
  padding: 0.1em;
  border-radius: 0.5em;
  margin-top: 15px;
}
.button-container {
  display: flex;
  gap: 0.5em;
  flex-shrink: 1;
}
.completed {
  text-decoration: line-through;
}
</style>
