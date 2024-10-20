<script setup>
const props = defineProps(["todo"]);
import {useToDoStore} from "../todo.ts";
import dayjs from "dayjs";

const ToDoStore = useToDoStore();
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>{{ todo.title }}</v-card-title>
    <v-card-subtitle>{{ todo.full_time }}</v-card-subtitle>
    <v-card-text
    >{{ dayjs(todo.start_time).format("MM/DD HH:mm") }} to
      {{ dayjs(todo.end_time).format("MM/DD HH:mm") }}
    </v-card-text>
    <v-card-actions class="actions">
      <v-btn
          class="delete-button"
          @click="ToDoStore.archiveTodo(todo.id)"
      >
        Fail
      </v-btn>
      <v-btn
          class="delete-button"
          @click="ToDoStore.archiveTodo(todo.id)"
      >
        Achieve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.actions {
  justify-content: end;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
