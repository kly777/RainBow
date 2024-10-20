<template>
  <button @click="authStore.logout()">Logout</button>

</template>

<script setup>
import {useAuthStore} from "./auth.ts";


const authStore = useAuthStore();

</script>