<template>
  <div class="day-container">
    <!-- 如果是本月的第一天，显示月份 -->
    <div v-if="isFirstOfMonth(id)" class="month-label">
      {{ dayjs(getDateOfId(id)).format("M") }}月
    </div>
    <!-- 显示日期 -->
    <div class="day-number">
      {{ dayjs(getDateOfId(id)).format("D") }}
    </div>
    <!-- 如果是今天，显示“今”字 -->
    <div v-if="isToday(id)" class="today-indicator">今</div>
    <div
        :class="{ 'today-bg': isToday(id), 'focus-bg': isFocusDay(id) }"
        class="background-color"
    ></div>
  </div>
</template>

<script setup>
import {useFocusStore} from "./focus.ts";

import dayjs from "dayjs";
import {defineProps, ref} from "vue";

const props = defineProps(["cell", "row"]);
const id = props.cell + (props.row - 1) * 7;
const currentDate = ref(new Date());

const focusStore = useFocusStore();

// 根据id获取日期
function getDateOfId(id) {
  const date = new Date(focusStore.firstDayOfTable);
  date.setDate(date.getDate() + id - 1);
  return date;
}

// 判断是否是本月的第一天
function isFirstOfMonth(id) {
  return getDateOfId(id).getDate() === 1;
}

// 判断是否是今天
function isToday(id) {
  return (
      getDateOfId(id).toLocaleDateString() ===
      currentDate.value.toLocaleDateString()
  );
}

function isFocusDay(id) {
  return focusStore.focus.getDate() === getDateOfId(id).getDate();
}
</script>

<style scoped>
.day-container {
  align-items: center;
  justify-content: center;
  position: relative;
  /* 用于定位其他元素 */
  overflow: hidden;
  /* 防止子元素溢出 */
}

.month-label {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 12px;
  color: #999;
}

.day-number {
  font-size: 16px;
  color: #333;
}

.today-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 10px;
  color: #ff0000;
  background-color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
}

.background-color {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.today-bg {
  background-color: rgba(255, 0, 0, 0.1);
}

.focus-bg {
  background-color: rgba(0, 255, 0, 0.1);
}
</style>
