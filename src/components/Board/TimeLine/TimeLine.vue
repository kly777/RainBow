<script setup lang="ts">
import dayjs from "dayjs";

const today = dayjs();

const firstDayOfTimeLine = today.subtract(3, "day");

function getDay(id: number) {
    return dayjs(firstDayOfTimeLine).add(id, "day").format("YYYY-MM-DD");
}

import Date from "./Date.vue";
</script>

<template>
    <div class="timeline">
        <Date v-for="i in 12" class="timeline-day" :date="getDay(i)" />
    </div>
</template>

<style scoped>
.timeline {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    overflow: scroll;
    height: 100%;
    margin: 15px;
    background-color: #ffffff;
    border-radius: 10px;
}

.timeline-day {
    min-width: 200px;
    min-height: 200%;
}
</style>
