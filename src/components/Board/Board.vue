<template>
    <v-layout class="container" app>
        <v-navigation-drawer
            location="left"
            v-model="drawer"
            :rail="rail"
            permanent
            @click="rail = false"
            class="sidebar"
            :width="200"
            z-index="9"
        >

            <v-list density="compact" nav >
                <v-list-item
                    prepend-icon="mdi-view-dashboard"
                    title="Board"
                    :to="{ name: 'Board' }"
                    :active="
                        $route.path === '/board' || $route.path === '/board/'
                    "
                    @click.stop
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-format-list-checks"
                    title="ToDo"
                    to="/board/todo"
                    :active="$route.path === '/board/todo'"
                    @click.stop
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-calendar"
                    title="Cal"
                    to="/board/calendar"
                    :active="$route.path === '/board/calendar'"
                    @click.stop
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-timeline"
                    title="Timeline"
                    to="/board/timeline"
                    :active="$route.path === '/board/timeline'"
                    @click.stop
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app density="compact">
            <v-btn
                @click="todoStore.createTodo()"
                icon="mdi-plus"
                size="small"
            ></v-btn>
        </v-app-bar>

        <v-main class="main-content">
            <RouterView />
        </v-main>
        <ContextMenu v-show="contextMenuStore.show" />
    </v-layout>
</template>

<script lang="ts" setup>
import { useContextMenuStore } from "./ContextMenu";
const contextMenuStore = useContextMenuStore();
import ContextMenu from "./ContextMenu.vue";
import { onMounted, ref } from "vue";
const drawer = ref(true);
const rail = ref(true);
import { useTodoStore } from "./ToDoStore";
const todoStore = useTodoStore();

onMounted(async () => {
    await todoStore.fetchTodos();
});
</script>

<style scoped>
.main-content {
    flex-grow: 1;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.container {
    background-color: hsl(0, 0%, 93%);
    display: flex;
}

.container {
    height: calc(100vh - 24px);
}

.v-navigation-drawer {
    transition: width 0.3s ease;
}

.v-list-item {
    cursor: pointer;
}
</style>
