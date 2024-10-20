<script setup>




</script>

<template>
  <div class="container">
    <div class="color red" @mousemove="animate($el)"></div>
    <div class="color orange"></div>
    <div class="color yellow"></div>
    <div class="color green"></div>
    <div class="color cyan"></div>
    <div class="color blue"></div>
    <div class="color violet"></div>
    <div ref="boarder" class="color white">
      <div class="text">BRAINBOW</div>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: calc(100vh - 24px);
  overflow: hidden;
}

@keyframes identifier {
  0% {
    transform: rotate(-17deg) scale(1, 1);
  }

  50% {
    transform: rotate(-17deg) scale(2, 2);
  }

  100% {
    transform: rotate(-17deg) scale(1, 1);
  }
}

.color {
  left: -80px;
  width: 140%;
  height: 13vh;
  transform: rotate(-17deg);
  position: relative;
  transition: all 0.9s ease-in-out;
  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.2);
  animation: identifier 1.5s ease-in-out;
}
.animate-end {
  transform: scale(2);
}


.red {
  background: linear-gradient(70deg,
      hsl(0, 80%, 60%),
      70%,
      hsl(30, 80%, 60%));
  z-index: 1;
  animation-delay: 0.5s;
}

.orange {
  background: linear-gradient(70deg,
      hsl(30, 80%, 60%),
      70%,
      hsl(60, 80%, 60%));
  z-index: 2;
  animation-delay: 1s;
}

.yellow {
  background: linear-gradient(70deg,
      hsl(60, 80%, 60%),
      70%,
      hsl(120, 80%, 60%));
  z-index: 3;
  animation-delay: 1.5s;
}

.green {
  background: linear-gradient(70deg,
      hsl(120, 80%, 60%),
      70%,
      hsl(180, 80%, 60%));
  z-index: 4;
  animation-delay: 2s;
}

.cyan {
  background: linear-gradient(70deg,
      hsl(180, 80%, 60%),
      70%,
      hsl(240, 80%, 60%));
  z-index: 5;
  animation-delay: 2.5s;
}

.blue {
  background: linear-gradient(70deg,
      hsl(240, 80%, 60%),
      70%,
      hsl(270, 80%, 60%));
  z-index: 6;
  animation-delay: 3s;
}

.violet {
  background: linear-gradient(70deg,
      hsl(270, 80%, 60%),
      70%,
      hsl(360, 80%, 60%));
  z-index: 7;
  animation-delay: 3.5s;
}

.white {
  background: white;
  z-index: 8;
  height: 25vh;
  animation: none;

  &:hover {
    transform: scale(1.5, 1.5) rotate(-17deg);
    transition: all 0.3s ease;
  }
}

.text {
  position: relative;
  left: 55%;
}
</style>
