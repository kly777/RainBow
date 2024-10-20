<template>
    <div class="todo-container" v-for="todo in rootTodos" :key="todo.id">
        <Content :todo="todo" :parentId="props.parentId" :shouldFocus="props.shouldFocus" />
        <div class="children">
            <BoardCardList :parentId="todo.card.id" :todos="props.todos" :shouldFocus="props.shouldFocus" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useTodoStore } from "../ToDoStore";
import type { Todo } from "@/API/interface";
import Content from "./Content/Content.vue";

const todoStore = useTodoStore();

const props = defineProps<{
    parentId?: number;
    todos: Todo[];
    shouldFocus?: boolean;
}>();

const rootTodos = computed(() => {
    const allTodos = todoStore.todos;
    if (props.parentId === undefined) {
        return allTodos
            .filter(
                (t: Todo) =>
                    !t.card.relation.parents.length ||
                    !t.card.relation.parents.some((parent: any) =>
                        allTodos.some(
                            (todo: Todo) => todo.card.id === parent.card.id
                        )
                    )
            )
            .sort((a: Todo, b: Todo) => b.priority - a.priority);
    } else {
        return allTodos
            .filter((t: Todo) =>
                t.card.relation.parents.some(
                    (parent: any) => parent.card.id === props.parentId
                )
            )
            .sort((a: Todo, b: Todo) => b.priority - a.priority);
    }
});
</script>

<style scoped>
.todo-container {
    border: 1px solid #bfbfbf;
    border-radius: 10px;
    margin: 5px;
    background-color: #ffffff;
    height: fit-content;
    width: auto;
}
</style>
