<template>
  <div class="todo-app">
    <h3 class="app-title">Todo List</h3>
    <AddToDo class="add-todo"/>

    <div class="todos-list">
      <ToDoTree/>
    </div>
  </div>
</template>

<script setup>
import {useToDoStore} from "./todo.ts";
import AddToDo from "./ToDoCal/AddToDo.vue";
import ToDoTree from "./ToDoCal/ToDoTree.vue";
// 初始化待办事项列表
const ToDoStore = useToDoStore();


</script>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
}

.app-title {
  text-align: center;
  margin-bottom: 20px;
}

.todo-item {
  color: #242424;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.todo-item:hover {
  transform: scale(1.02);
}

.add-todo {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-todo:hover {
  background-color: #0056b3;
}
</style>
