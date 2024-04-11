<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .button {
        align-self: flex-end;

        border: 2px solid teal;
        padding: 10px 15px;
        background: #242424;
        color: teal;
    }
</style>