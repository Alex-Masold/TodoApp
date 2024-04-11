<template>
    <textarea class="textarea" v-model="modelValue">

    </textarea>
</template>

<script setup lang="ts">
    const modelValue = defineModel<string>();
</script>

<style scoped>
.textarea {
  resize: none;
  border: none;
  width: auto;
  padding: 0px;
  background-color: transparent;
  overflow: hidden;
  color:  rgba(235, 235, 235, 0.64);
  text-align: center;
  font-size: 15px;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
}
</style>