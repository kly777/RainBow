<template>
    <v-system-bar
        :class="{ animate__slideInDown: juststart }"
        class="system-bar animate__animated"
    >
        <nav class="nav">
            <RouterLink class="router-link" to="/">Home</RouterLink>
            <RouterLink class="router-link" to="/card">Card</RouterLink>
            <RouterLink class="router-link" to="/board">Board</RouterLink>
            <RouterLink class="router-link" to="/try">Try</RouterLink>
            <RouterLink
                v-show="!authStore.isLogin"
                class="router-link"
                to="/login"
                >Login</RouterLink
            >
        </nav>
        <v-icon v-if="isOnline" x-small class="net">mdi-wifi</v-icon>
        <v-icon v-else color="red" x-small class="net">mdi-wifi-off</v-icon>
        <span class="time">{{ time }}</span>
    </v-system-bar>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useAuthStore } from "../auth/auth";

const authStore = useAuthStore();

const time = ref(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));

import { useOnline } from '@vueuse/core'

const isOnline = useOnline()

function clock() {
    time.value = dayjs(time.value)
        .add(1, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");
}

const juststart = ref(true);
setTimeout(() => {
    juststart.value = false;
}, 1000);
setInterval(clock, 1000);
</script>

<style scoped>
.time{
    margin-right:15px ;
}
.system-bar {
    opacity: 0.9;
    display: flex;
    border-bottom: 1px solid #dee2e6;
    background-color: #f8f9fa;
    padding-right: 5%;
}

.nav {
    display: flex;
    align-items: start;
    position: inherit;
    left: 5%;
}

.router-link {
    color: #000000;
    padding: 2px;
    margin: 4px;
    border-radius: 4px;
}

.router-link:hover {
    color: #fff;
    background-color: #757575;
    border-color: #6e6e6e;
}
.net {
    margin-right: 5px;
}
</style>
