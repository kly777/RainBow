<template>
    <span>
        {{ dayjs(focusStore.focus).format("YYYY年M月D日") }}
    </span>
  <span class="navigation-buttons">
        <button class="nav-button" @click="focusStore.prevWeek">上一周</button>
        <button class="nav-button" @click="focusStore.nextWeek">下一周</button>
        <button class="nav-button" @click="focusStore.prevDay">上一天</button>
        <button class="nav-button" @click="focusStore.nextDay">下一天</button>
        <button class="nav-button" @click="focusStore.backToday">回到今天</button>
    </span>
</template>

<script setup>

import dayjs from "dayjs";


import {useFocusStore} from "./focus.ts";

const focusStore = useFocusStore();

</script>

<style scoped>
.navigation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.nav-button {
  margin: 0 10px;

  padding: 10px 20px;

  font-size: 14px;

  color: #fff;

  background-color: #007bff;

  border: none;

  border-radius: 5px;

  cursor: pointer;

  transition: background-color 0.3s ease;

}

.nav-button:hover {
  background-color: #0056b3;

}
</style>