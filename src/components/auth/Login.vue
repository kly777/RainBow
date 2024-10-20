// src/components/Login.vue

<template>
  <div>
    <form @submit.prevent="authStore.login(userInfo)">
      <input v-model="userInfo.username" placeholder="Username" type="text">
      <input v-model="userInfo.password" placeholder="Password" type="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>


<script setup>
import {ref} from "vue";
import {useAuthStore} from "./auth.ts";

const authStore = useAuthStore();
const userInfo = ref({
  username: '',
  password: ''
})


</script>