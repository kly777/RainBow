<template>
    <div class="content">
        <Header :parentId="parentId" :todo="todo" @timeSwitch="timeSwitch(todo)" />

        <v-text-field v-model="todo.card.title" class="title reverse-ellipsis" density="compact" variant="plain"
            hide-details @update:model-value="todoStore.updateTodoCardTitle(todo.id, $event)" @keydown.enter="
                parentId
                    ? todoStore.createTodoWithParent(parentId)
                    : todoStore.createTodo(todo.card.id)
                " ref="titleInput"></v-text-field>


        <div class="time" v-if="todo.start || todo.end || timeRange">
            <template v-if="timeRange">
                <el-date-picker v-model="todo.start" type="datetime" placeholder="开始时间" size="small"
                    format="YY-MM-DD HH:mm" date-format="MMM DD, YYYY" time-format="HH:mm" class="time-picker"
                    @change="todoStore.updateTodo(todo.id, { start: $event })"></el-date-picker>
                <el-date-picker v-model="todo.end" type="datetime" placeholder="结束时间" size="small"
                    format="YY-MM-DD HH:mm" date-format="MMM DD, YYYY" time-format="HH:mm" class="time-picker"
                    @change="todoStore.updateTodo(todo.id, { end: $event })"></el-date-picker>
            </template>
            <template v-else>
                <span v-if="todo.start">st:{{ dayjs(todo.start).format("MM-DD HH:mm") }}
                </span>
                <span v-if="todo.end">ed:{{ dayjs(todo.end).format("MM-DD HH:mm") }}
                </span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, nextTick, onMounted } from "vue";
import { useTodoStore } from "../../ToDoStore";
import type { Todo } from "@/API/interface";
import Header from "./Header.vue";
const todoStore = useTodoStore();
const titleInput = ref<HTMLInputElement | null>(null);
const props = defineProps<{
    todo: Todo;
    parentId?: number;
    shouldFocus?: boolean;
}>();

const timeRange = ref(false);
async function timeSwitch(todo: Todo) {
    if (timeRange.value) {
        await todoStore.updateTodo(todo.id, {
            start: undefined,
            end: undefined,
        });
        timeRange.value = false;
    } else {
        timeRange.value = true;
    }
}

function focusInput() {
    nextTick(() => {
        if (props.shouldFocus) {
            titleInput.value?.focus();
        }
    });
}

onMounted(() => {
    focusInput();
});
</script>

<style scoped>
.content {
    padding: 10px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 10px;
}

.title {
    font-size: 1em;
    width: auto;
    min-width: 200px;
    border: none;
    height: fit-content;
}

.time {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.btn {
    margin: 0 5px;
}

.btn-container {
    display: flex;
    justify-content: space-between;
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

.header-sub {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
}

.priority {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 12px;
    margin: 5px;
}
</style>
