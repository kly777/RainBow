<template>
    <v-data-table :items="todos" :headers="headers" class="todo-table">
        <template v-slot:item.parents="{ item }">
            {{
                item.card.relation.parents
                    .map((parent) => parent.card.title)
                    .join(", ")
            }}
        </template>
        <template v-slot:item.tags="{ item }">
            {{ item.card.tags.map((tag) => tag.tag.title).join(", ") }}
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { useTodoStore } from "./ToDoStore";
import { formatDate } from "@/utils/tranTime";
import type { Todo } from "@/API/interface";
import { ref } from "vue";
import dayjs from "dayjs";

const todoStore = useTodoStore();
const todos = ref<Todo[]>(todoStore.todos);
const headers = ref<
    Array<{
        title: string;
        value?: (item: Todo) => string;
        key?: string;
    }>
>([
    { title: "Todo", key: "card.title" },
    { title: "Priority", key: "priority" },
    {
        title: "Start",
        key: "start",
        value: (item: Todo) =>
            item.start
                ? `${dayjs(item.start).format("YYYY-MM-DD HH:mm")}`
                : "未设置",
    },
    {
        title: "End",
        key: "end",
        value: (item: Todo) =>
            item.end
                ? `${dayjs(item.end).format("YYYY-MM-DD HH:mm")}`
                : "未设置",
    },
    {
        title: "Parents",
        key: "parents",
        value: (item: Todo) =>
            item.card.relation.parents
                .map((parent) => parent.card.title)
                .join(", "),
    },
    {
        title: "Tags",
        key: "tags",
        value: (item: Todo) =>
            item.card.tags.map((tag) => tag.tag.title).join(", "),
    },
]);
</script>

<style scoped>
.todo-table {
    margin: 16px;
    min-width: 0px;
    width: auto;
    border-radius: 10px;
    height: 96%;
}
</style>
