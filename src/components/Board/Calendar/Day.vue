<script setup lang="ts">
import type { Todo } from "@/API/interface";
import { useTodoStore } from "../ToDoStore";
const todoStore = useTodoStore();
import { computed, onMounted, watch } from "vue";
import dayjs from "dayjs";

import { ref } from "vue";
import {
    vDraggable,
    type SortableEvent,
    type UseDraggableReturn,
} from "vue-draggable-plus";

const props = defineProps<{
    date: string;
}>();

const todos = ref(
    todoStore.todos.filter((todo: Todo) =>
        dayjs(todo.start).isSame(dayjs(props.date), "day")
    )
);

const date = computed(() => {
    if (dayjs(props.date).isSame(dayjs(), "day")) {
        return "今天";
    }
    if (dayjs(props.date).isSame(dayjs(), "month")) {
        return dayjs(props.date).format("DD");
    }
    return dayjs(props.date).format("MM-DD");
});
const el = ref<UseDraggableReturn>();
async function onAdd(event: SortableEvent) {
    const todoString = event.item.getAttribute("todo");
    if (!todoString) return;
    const todo = JSON.parse(todoString);
    const todoInfo = {
        start: todo.start
            ? dayjs(todo.start)
                  .month(dayjs(props.date).month())
                  .date(dayjs(props.date).date())
                  .format()
            : undefined,
        end: todo.end
            ? dayjs(todo.end)
                  .month(dayjs(props.date).month())
                  .date(dayjs(props.date).date())
                  .format()
            : undefined,
    };
    await todoStore.updateTodo(todo.id, todoInfo);
}
</script>

<template>
    <div class="day">
        <div class="day-header">
            <div class="day-header-title">{{ date }}</div>
        </div>
        <div
            class="day-content"
            v-draggable="[
                todos,
                {
                    group: '123',
                    animation: 150,
                    ghostClass: 'ghost',
                    onAdd: onAdd,
                },
            ]"
        >
            <div
                class="day-content-item"
                v-for="todo in todos"
                :key="todo.id"
                :todo="JSON.stringify(todo)"
            >
                {{ todo.card.title }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.day {
    display: flex;
    flex-direction: column;
}
.day-content-item {
    margin: 5px;
    height: auto;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 4px;
    min-width: 0;
    font: 0.9em sans-serif;
}
.day-content-item:hover {
    background-color: #f0f0f0;
}
.day-header {
    height: auto;
    display: flex;
    flex-direction: column;
}
.day-header-title {
    margin-top: 5px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.day-content {
    height: 100%;
}
.draggable-container {
    height: 100%;
}
</style>
