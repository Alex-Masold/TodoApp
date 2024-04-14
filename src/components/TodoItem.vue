<template>
  <div class="todo-item">
    <span> {{ props.todo.id }} </span>
    <div
      :class="{ completed: props.todo.isCompleted }"
      type="text"
      v-if="!isEdit"
      @click="handleCompleteTask"
      @dblclick="handleEditTask">
      {{ props.todo.title }}
    </div>
    <CustomTextarea class="edit" v-else v-focus v-model="modelValue" @click.stop="handleEditTask" />
    <div class="button-container">
      <CustomButton v-show="!props.todo.isCompleted" @click="handleDeleteTask">
        Delete
      </CustomButton>
      <CustomButton
        v-show="!props.todo.isDeleted && !props.todo.isCompleted"
        @click="handleEditTask">
        Edit
      </CustomButton>
      <CustomButton v-show="props.todo.isDeleted" @click="handelRestoreTask">
        Restore
      </CustomButton>
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
  }
});

const isEdit = ref<boolean>(false);

const modelValue = defineModel<string>();

const emit = defineEmits(['delete-task', 'complete-task', 'restore-task']); // вообще надо покумекать над computed

function handleDeleteTask() {
  emit('delete-task', props.todo.id); // если isDeleted = false, то мягко удаляет, если isDeleted = true, то немягко удаляет
}

function handleCompleteTask() {
  if (props.todo.isDeleted === false && props.todo.isCompleted === false) {
    emit('complete-task', props.todo.id);
  }
}

function handelRestoreTask() {
  if (props.todo.isDeleted === true) {
    emit('restore-task', props.todo.id);
  }
}

function handleEditTask() {
  if (props.todo.isDeleted === false && props.todo.isCompleted === false) {
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
