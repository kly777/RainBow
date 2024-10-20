<script setup lang="ts">
import type { Todo } from "@/API/interface";
import { ref } from "vue";

const props = defineProps<{
    todo: Todo;
}>();
</script>

<template>
    <div class="todo-time-line">
        {{ props.todo.card.title }}
    </div>
</template>

<style scoped>
.todo-time-line {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    border: 1px solid #8b8b8b;
    border-radius: 15px;
    padding: 8px;
    
}
</style>
