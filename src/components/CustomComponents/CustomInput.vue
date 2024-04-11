<template>
  <input class="input" type="text" v-model="inputValue" />
</template>

<script setup lang="ts">
const inputValue = defineModel<string>();
</script>

<style scoped>
  .input {
        border: none;
        color: teal;
        background-color: transparent;
        padding: 10px 15px;
    }
</style>
