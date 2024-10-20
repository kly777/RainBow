<template>
    <div class="header">
        <div class="state-btn">
            <v-icon v-if="todo.state == 1" @click="todoStore.updateTodoState(todo.id, 0)"
                color="green">mdi-check</v-icon>
            <v-icon v-if="todo.state == 0" @click="todoStore.updateTodoState(todo.id, 1)">mdi-circle-outline</v-icon>
        </div>
        <div class="btn-container" v-if="act">
            <v-btn @click="todoStore.deleteTodo(todo.id)" icon="mdi-minus" size="xx-small" class="btn"></v-btn>
            <v-btn @click="todoStore.createTodoWithParent(todo.card.id)" icon="mdi-plus" size="xx-small"
                class="btn"></v-btn>
            <v-btn @click="$emit('timeSwitch')" icon="mdi-clock-outline" size="xx-small" class="btn"></v-btn>
            <v-btn @click="todoStore.moveTodo(todo.id, 1)" icon="mdi-arrow-up" size="xx-small" class="btn"></v-btn>
            <v-btn @click="todoStore.moveTodo(todo.id, -1)" icon="mdi-arrow-down" size="xx-small" class="btn"></v-btn>
            <v-icon class="priority-circle btn">
                {{ `mdi-numeric-${todo.priority}-circle` }}
            </v-icon>
        </div>
        <v-icon @click="act = !act"> mdi-dots-horizontal </v-icon>
    </div>
</template>

<script lang="ts" setup>
import type { Todo } from "@/API/interface";
defineProps<{ todo: Todo; parentId?: number }>();

import { ref, nextTick, onMounted } from "vue";
import { useTodoStore } from "@/components/Board/ToDoStore";
const todoStore = useTodoStore();
const titleInput = ref<HTMLInputElement | null>(null);

const act = ref(false);
function focusInput() {
    if (!juststart)
        nextTick(() => {
            titleInput.value?.focus();
        });
}
const juststart = ref(true);
setTimeout(() => {
    juststart.value = false;
}, 1000);
onMounted(() => {
    focusInput();
});
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 10px;
}

.title {
    font-size: 1em;
    width: auto;
    min-width: 100px;
    border: none;
    height: fit-content;
}

.btn {
    margin: 0 3px;
}

.btn-container {
    display: flex;
    justify-content: space-between;
    align-self: center;
    flex-direction: row;
}

.state-btn {
    margin-right: 10px;
}

.reverse-ellipsis {
    direction: rtl;
    text-align: left;
}

.reverse-ellipsis :deep(input) {
    direction: ltr;
    text-align: left;
    text-overflow: ellipsis;
}
</style>
