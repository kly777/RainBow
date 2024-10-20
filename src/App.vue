<template>
  <v-layout app class="container">
    <SystemBar />
    <v-main class="main">
      <RouterView v-slot="{ Component }">
        <Transition :duration="300" mode="out-in" @leave="Leave">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </v-main>
  </v-layout>
</template>

<style scoped>
.container {
  align-items: center;
  justify-content: center;
  font: 1em sans-serif;
}

.v-enter-active {
  transition: all 0.5s ease-in-out;
}

.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from {
  opacity: 0;
}

.v-leave-to {
  opacity: 0;
}
</style>

<style>
@keyframes rotateAnimation {
  from {
    transform: rotate(25deg);
  }

  to {
    transform: rotate(-30deg);
  }
}

.overlay-leave {
  position: fixed;
  top: -100vh;
  left: -75vw;
  width: 250vw;
  height: 900vh;

  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.4);

  z-index: 99;
  opacity: 1;
  transition: opacity 0.5s ease;
  transform-origin: bottom center;
  animation: rotateAnimation 1.05s cubic-bezier(0.3, 0.7, 0.6, 0.27);
}
</style>

<script setup>
import { ref } from "vue";
import SystemBar from "./components/App/SystemBar.vue";

const hue = ref(0);

function Leave(el) {
  const overlay = document.createElement("div");
  overlay.className = "overlay-leave";
  const app = document.getElementById("app");
  const hueCopy = hue.value;
  overlay.style.backgroundColor = `hsl(${hueCopy}, 80%, 60%)`;
  hue.value = (hue.value + 30) % 360;
  app.appendChild(overlay);
  setTimeout(() => {
    app.removeChild(overlay);
  }, 1000); // 该时间应与 transition 中定义的时间一致
}



</script>
