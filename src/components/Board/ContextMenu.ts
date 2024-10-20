import type { Todo } from "@/API/interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useContextMenuStore = defineStore("contextMenu", () => {
    const targetTodo = ref<Todo | null>(null);
    const x = ref(0);
    const y = ref(0);
    const show = ref(false);
    const setX = (value: number) => {
        x.value = value;
    };
    const setY = (value: number) => {
        y.value = value;
    };
    const setShow = (value: boolean) => {
        show.value = value;
    };

    const openContextMenu = (event: MouseEvent, todo: Todo) => {
        event.preventDefault();
        targetTodo.value = todo;
        console.log("onContextMenu", todo);
        setX(event.clientX);
        setY(event.clientY);
        setShow(true);
    };

    const closeContextMenu = () => {
        setShow(false);
    };
    return { x, y, show, setX, setY, setShow, openContextMenu, closeContextMenu, targetTodo };
});