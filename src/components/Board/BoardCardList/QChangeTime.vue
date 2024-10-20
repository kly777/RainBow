<template>
    <v-dialog v-model="dateDialog">
        <v-card>
            <v-card-title>修改日期</v-card-title>
            <v-card-text>
                <el-date-picker
                    v-model="selectedDates[0]"
                    type="datetime"
                    placeholder="选择日期"
                ></el-date-picker>
                <el-date-picker
                    v-model="selectedDates[1]"
                    type="datetime"
                    placeholder="选择日期"
                ></el-date-picker>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="saveDates(todo)">保存</v-btn>
                <v-btn @click="dateDialog = false">取消</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../ToDoStore";
import type { Todo } from "@/API/interface";

const todoStore = useTodoStore();

const props = defineProps<{
    todo: Todo;
}>();

const dateDialog = ref(false);
const selectedDates = ref<string[]>([]);

function openDateDialog(todo: Todo) {
    dateDialog.value = true;
    selectedDates.value = [todo.start.toString(), todo.end.toString()];
}

function saveDates(todo: Todo) {
    console.log(selectedDates.value);
    console.log(todo);
    if (selectedDates.value) {
        console.log(selectedDates.value[0]);
        console.log(selectedDates.value[1]);
        todoStore.updateTodo(todo.id, {
            start: selectedDates.value[0],
            end: selectedDates.value[1],
        });
    }
    dateDialog.value = false;
}
</script>
<style scoped></style>
