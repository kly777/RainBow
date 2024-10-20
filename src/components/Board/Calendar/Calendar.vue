<template>
    <div class="calendar">
        <div class="header">header</div>
        <div class="weekdays">
            <div class="weekday">日</div>
            <div class="weekday">一</div>
            <div class="weekday">二</div>
            <div class="weekday">三</div>
            <div class="weekday">四</div>
            <div class="weekday">五</div>
            <div class="weekday">六</div>
        </div>
        <v-divider></v-divider>
        <div class="weeks-container">
            <div class="weeks" v-for="i in 9">
                <div class="week">
                    <Day v-for="a in 7" :date="getDay(i * 7 + a - 8)" class="day"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Day from "./Day.vue";
import dayjs from "dayjs";
import { ref, computed } from "vue";
const today = new Date();
const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
);
const firstDayOfCalendar = new Date(
    firstDayOfWeek.getFullYear(),
    firstDayOfWeek.getMonth(),
    firstDayOfWeek.getDate() - 14
);
function getDay(id: number) {
    return dayjs(firstDayOfCalendar).add(id, "day").format("YYYY-MM-DD");
}
</script>

<style scoped>
.weekdays {
    display: flex;
    flex-direction: row;
    height: auto;
    align-self: center;
    justify-content: center;
    border-bottom: 1px solid #aaaaaa;
}

.weekday {
    flex: 1;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}
.day {
    border: 1px solid #0e0e0ef8;
    flex: 1;
    min-width: 30px;
}
.header {
    width: 100%;
    padding: 10px;
}
.calendar {
    margin: 15px;
    border-radius: 15px;
    height: auto;
    overflow-y: hidden;
    background-color: #fff;
}
.week {
    display: flex;
    flex-direction: row;
    height: 100%;
    min-height: 100px;
}
.weeks {
    min-height: 100px;
}
.weeks-container {
    height: 100%;
    overflow-y: scroll;
}
</style>
