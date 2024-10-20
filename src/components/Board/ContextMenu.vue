<template>
    <div
        class="context-menu"
        :style="{
            top: `${contextMenuStore.y}px`,
            left: `${contextMenuStore.x}px`,
        }"
        ref="contextMenu"
    >
        <div @click="">编辑</div>
        <div @click="todoStore.deleteTodo(contextMenuStore.targetTodo.id)">
            删除
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useContextMenuStore } from "./ContextMenu";
const contextMenuStore = useContextMenuStore();

import { onClickOutside } from "@vueuse/core";

import { useTodoStore } from "./ToDoStore";

const todoStore = useTodoStore();

const contextMenu = ref<HTMLDivElement | null>(null);
onClickOutside(contextMenu, () => {
    console.log("onClickOutside");
    contextMenuStore.closeContextMenu();
});
</script>

<style scoped>
.context-menu {
    position: fixed;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10000;
}

.context-menu div {
    padding: 8px 12px;
    cursor: pointer;
}

.context-menu div:hover {
    background-color: #f0f0f0;
}
</style>
