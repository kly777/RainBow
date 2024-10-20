import { defineStore } from "pinia";
import { ref, computed } from "vue";
import TodoAPI from "@/API/todo";
import CardAPI from "@/API/card";
import RelationAPI from "@/API/relation";
import type { Card, Todo } from "@/API/interface";

export const useTodoStore = defineStore("todo", () => {
    const todos = ref<Todo[]>([]);

    const getTodos = computed(() => todos.value);

    async function fetchTodos() {
        todos.value = await TodoAPI.getAll();
    }
    async function createTodo() {
        const cardId = await CardAPI.create();
        const newTodo = await TodoAPI.create(cardId);
        todos.value.push(newTodo)
    }
    async function createTodoWithParent(parentId: number) {
        const cardId = await CardAPI.create();
        await RelationAPI.create({ child: cardId, parent: parentId });
        const newTodo: Todo = await TodoAPI.create(cardId);
        todos.value.push(newTodo)
    }
    async function deleteTodo(id: number) {
        await TodoAPI.delete(id);
        todos.value = todos.value.filter(todo => todo.id !== id);
    }

    async function updateTodo(id: number, todoData: Partial<Todo>) {
        await TodoAPI.update(id, todoData)
        const updatedTodo = await TodoAPI.get(id);
        const index = todos.value.findIndex(todo => todo.id === id)
        if (index !== -1 && updatedTodo) {
            todos.value[index] = updatedTodo;
        }
    }
    async function updateTodoCardTitle(id: number, title: string) {
        const cardId = todos.value.find(todo => todo.id === id)?.card.id
        if (cardId && title !== "") {
            await CardAPI.update(cardId, { title })
        }
    }
    async function updateTodoState(id: number, state: number) {
        if (state === 1) {
            await TodoAPI.update(id, { state: 1 })
        } else {
            await TodoAPI.update(id, { state: 0 })
        }
        const updatedTodo = await TodoAPI.get(id);
        const index = todos.value.findIndex(todo => todo.id === id)
        if (index !== -1 && updatedTodo) {
            todos.value[index] = updatedTodo;
        }
    }

    async function moveTodo(id: number, direction: number) {
        const movedTodo = todos.value.find(todo => todo.id === id)
        if (movedTodo)
        await TodoAPI.update(id,{priority:movedTodo.priority+direction})
        const updatedTodo = todos.value.find(todo => todo.id === id)!
        updatedTodo.priority = updatedTodo.priority + direction
    }

    return {
        todos: getTodos,
        createTodoWithParent,
        deleteTodo,
        fetchTodos,
        createTodo,
        updateTodo,
        updateTodoCardTitle,
        updateTodoState,
        moveTodo,
    };
});