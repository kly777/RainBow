<template>
  <el-button plain @click="dialogVisible = true">
    Click to add
  </el-button>
  <el-dialog v-model="dialogVisible" :before-close="handleClose" class="dialog-box" title="Tips" width="500">
    <el-row>
      <label for="title">标题:</label>
      <el-input id="title" v-model="addedToDo.title" required type="text"/>
      <el-switch v-model="addedToDo.full_time"/>
    </el-row>
    <el-row>
      <el-slider v-model="addedToDo.priority" :max="7" :min="0" :step="1"/>
    </el-row>
    <el-row>
      <label for="start-time">开始时间:</label>
      <el-date-picker v-model="addedToDo.start_time" :shortcuts="shortcuts" format="YYYY-MM-DD HH:mm"
                      placeholder="Select date and time" time-format="HH:mm" type="datetime"/>
    </el-row>
    <el-row>
      <label for="end-time">结束时间:</label>
      <el-date-picker v-model="addedToDo.end_time" :shortcuts="shortcuts" format="YYYY-MM-DD HH:mm"
                      placeholder="Select date and time" time-format="HH:mm" type="datetime"/>
    </el-row>
    <button type="submit" @click="ToDoStore.addToDo(addedToDo)">提交</button>
  </el-dialog>
</template>

<script setup>
import {useToDoStore} from '../todo.ts'
import {ref} from 'vue';

const ToDoStore = useToDoStore()

const dialogVisible = ref(false)


const addedToDo = ref({
  title: null,
  full_time: false,
  content_tag: [],
  content: "",
  status: 0,
  priority: 0,
  start_time: null,
  end_time: null,
});

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      return date
    },
  },
]
</script>


<style scoped>
.dialog-box {
  border: 1px solid #ccc;

  border-radius: 10px;
}

el-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  height: 30px;
}

</style>