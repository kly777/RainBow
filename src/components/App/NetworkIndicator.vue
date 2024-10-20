<script setup>
import Ping from 'ping.js';
import {onMounted, ref} from 'vue';

const p = new Ping({
  timeout: 100,
});
const state = ref(1)


setInterval(checkNetwork, 10000);
onMounted(async () => {
  try {
    await checkNetwork()
  } catch (error) {
  }
})

async function checkNetwork() {
  try {
    await p.ping("https://www.taobao.com", async function (err) {
      if (err) {
        state.value = 0;
      } else {
        try {
          await p.ping("https://www.google.com.hk", function (err) {
            if (err) {
              state.value = 1;
            } else {
              state.value = 2;
            }
          });
        } catch (error) {
        }
      }
    });
  } catch (error) {
  }
}


</script>

<template>
  <v-icon v-if="state === 0" color="red" x-small>mdi-wifi-off</v-icon>
  <v-icon v-else-if="state === 1" x-small>mdi-wifi</v-icon>
  <v-icon v-else-if="state === 2" x-small>mdi-wifi-check</v-icon>
</template>

<style scoped>



</style>