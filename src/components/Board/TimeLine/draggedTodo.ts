import { defineStore } from "pinia";

export const useDraggedTodoStore = defineStore("draggedTodo", {
    state: () => ({
        draggedTodo: null,
    }),
});