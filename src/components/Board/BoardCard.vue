<template>
    <div class="board">
        <BoardCardList :todos="sortedTodos" :shouldFocus="shouldFocus" />
    </div>
</template>

<script setup lang="ts">
import BoardCardList from "./BoardCardList/BoardCardList.vue";
import { computed, nextTick, onMounted, ref } from "vue";
import { useTodoStore } from "./ToDoStore";
const todoStore = useTodoStore();

const sortedTodos = computed(() => {
    return [...todoStore.todos].sort((a, b) => {

        return b.priority - a.priority;
    });
});

const shouldFocus = ref(false);

onMounted(() => {
    nextTick(() => {
        setTimeout(() => {
            shouldFocus.value = true;
        }, 2000);
    });
});
</script>

<style scoped>
.board {
    display: flex;
    width: auto;
    height: 100%;
    flex: 1;
    overflow: auto;
    padding: 10px;

}
</style>
