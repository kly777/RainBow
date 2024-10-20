<script lang="ts" setup>
import { useTodoStore } from "../ToDoStore";
import type { Todo } from "@/API/interface";
import { computed, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useElementSize } from "@vueuse/core";
import { useMouseInElement } from "@vueuse/core";

const props = defineProps<{ date: string }>();
const todoStore = useTodoStore();

const todos = computed(() =>
    todoStore.todos.filter((todo: Todo) =>
        dayjs(todo.start).isSame(dayjs(props.date), "day")
    )
);

const calculatePosition = (todo: Todo) => {
    const top = dayjs(todo.start).diff(dayjs(props.date), "minute") / 24 / 60;
    let height = todo.end
        ? dayjs(todo.end).diff(dayjs(todo.start), "minute") / 24 / 60
        : 0.01;
    if (height > 1) {
        height = 1;
    }
    return {
        top: `${top * 100}%`,
        height: `${height * 100}%`,
    };
};

const day = ref(null);
const { elementY } = useMouseInElement(day);
const { height } = useElementSize(day);

const targetTime = computed(() => {
    const totalMinutes = (elementY.value / height.value) * 24 * 60;
    const roundedMinutes = Math.round(totalMinutes / 5) * 5; // 四舍五入到最近的5分钟的倍数
    return dayjs(props.date)
        .startOf("day") // 确保我们从当天的开始计算
        .add(roundedMinutes, "minute");
});

import { useDraggedTodoStore } from "./draggedTodo";
const draggedTodoStore = useDraggedTodoStore();
const onDragStart = (event: DragEvent, todo: Todo) => {
    draggedTodoStore.draggedTodo = todo;
    console.log("onDragStart", draggedTodoStore.draggedTodo.id);
};

const onDrop = (event: DragEvent) => {
    console.log("onDrop", event);
    event.preventDefault();
    if (draggedTodoStore.draggedTodo) {
        const newStart = dayjs(draggedTodoStore.draggedTodo.start)
            .date(dayjs(props.date).date())
            .hour(dayjs(targetTime.value).hour())
            .minute(dayjs(targetTime.value).minute());
        todoStore.updateTodo(draggedTodoStore.draggedTodo.id, {
            start: newStart,
            end: dayjs(newStart).add(
                dayjs(draggedTodoStore.draggedTodo.end).diff(
                    dayjs(draggedTodoStore.draggedTodo.start)
                )
            ),
        });
    }
};

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
};

import { useContextMenuStore } from "../ContextMenu";
const contextMenuStore = useContextMenuStore();

import ToDoTimeLine from "./Date/ToDoTimeLine.vue";
const now = ref<HTMLElement | null>(null);
onMounted(() => {
    const nowElements = document.getElementsByClassName("nowHour");
    now.value = nowElements[0] as HTMLElement;
    console.log(now.value);
    now.value.focus();
});
</script>

<template>
    <div>
        <div
            class="day-header"
            :class="{
                today: dayjs(props.date).isSame(dayjs(), 'day'),
                past: dayjs(props.date).isBefore(dayjs(), 'day'),
            }"
        >
            {{ dayjs(props.date).format("MM-DD") }}
        </div>
        <div
            class="day-container"
            ref="day"
            @drop="onDrop"
            @dragover="onDragOver"
            :data-date="props.date"
        >
            <div
                v-for="hour in 24"
                :key="hour"
                class="hour-line"
                :class="{
                    nowHour:
                        hour - 1 === dayjs().hour() &&
                        dayjs(props.date).isSame(dayjs(), 'day'),
                }"
                :style="{ top: `${((hour - 1) * 100) / 24}%` }"
            >
                {{ hour - 1 }}:00
            </div>
            <div
                draggable="true"
                class="day-content"
                v-for="todo in todos"
                :style="calculatePosition(todo)"
                @dragstart="(event) => onDragStart(event, todo)"
                :key="todo.id"
                :data-id="todo.id"
                @contextmenu="contextMenuStore.openContextMenu($event, todo)"
            >
                <ToDoTimeLine :todo="todo" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.nowHour {
    background-color: rgb(255, 0, 60);
}
.today {
    background-color: #868585;
}
.past {
    background-color: #d7d7d7;
}
.day-content {
    position: absolute;
    width: 100%;
    left: 0;
    /* 其他样式保持不变 */
}
.drag {
    height: 100%;
}
.day-container {
    position: relative;
    height: calc(100% - 20px); /* 确保容器有足够的高度 */
}
.day-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px;
    height: fit-content;
}
.hour-line {
    position: absolute;
    width: 100%;
    border-top: 1px solid #e0e0e0;
    font-size: 0.8em;
    color: #888;
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
}
</style>
