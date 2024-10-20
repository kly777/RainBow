<template>
  <div class="calendar-container">
    <FocusSwitcher/>
    <div class="calendar-table">
      <table>
        <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day" scope="col">
            {{ day }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in 5" :key="row">
          <td v-for="cell in 7" :key="cell" class="day-cell">
            <DayContainer
                :cell="cell"
                :row="row"
                class="day-container"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import DayContainer from "./DayContainer.vue";
import FocusSwitcher from "./FocusSwitcher.vue";

// 定义星期几
const daysOfWeek = ["一", "二", "三", "四", "五", "六", "日"];
</script>

<style scoped>
.day-cell {
  margin: auto;
  width: auto;
  max-width: 20px;
}

.day-container {
  margin: auto;
  width: auto;
  height: auto;
}

.calendar-table {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
}

.day-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.month-label {
  font-size: 12px;
  color: #666;
}

.day-number {
  font-size: 16px;
}

.today-indicator {
  background-color: #ff0000;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.navigation-buttons {
  margin-top: 20px;
}

.calendar-container {
  overflow: hidden;

}
</style>
