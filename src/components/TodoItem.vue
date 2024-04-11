<template>
  <div class="todo-item">
    <span> {{ props.todo.id }} </span>
    <div @dblclick="handleEditTodo" v-if="!isEdit" id="input" type="text">
      {{ props.todo.title }}
    </div>
    <CustomTextarea class="edit" v-else v-focus v-model="modelValue" @click.stop="handleEditTodo" />
    <div class="button-container">
      <CustomButton @click="handleDeleteTodo"> Delete </CustomButton>
      <CustomButton v-show="!props.isDeleted" @click="handleEditTodo"> Edit </CustomButton>
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
    type: Boolean,
    default: false
  }
});

const isEdit = ref<boolean>(false);

const modelValue = defineModel<string>();

const emit = defineEmits(['delete-todo', 'complete-todo', 'restore-todo']); // вообще надо покумекать над computed

function handleDeleteTodo() {
  emit('delete-todo', props.todo.id, props.isDeleted); // если isDeleted = true, то мягко удаляет, если isDeleted = false, то немягко удаляет
}

function handleEditTodo() {
  isEdit.value = !isEdit.value;
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
</style>
