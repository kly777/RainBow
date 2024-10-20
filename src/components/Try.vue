<template>
  <div ref="container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useMouse } from "@vueuse/core";
import * as THREE from "three";

const { x, y } = useMouse();
const container = ref(null);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.IcosahedronGeometry(2, 2);
const material = new THREE.MeshNormalMaterial();
material.wireframe = true;
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

onMounted(() => {
  container.value.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);
});

watch(
  () => [x.value, y.value],
  () => {
    camera.position.x = -(x.value - window.innerWidth / 2) * 0.01;
    camera.position.y = (y.value - window.innerHeight / 2) * 0.01;

    camera.lookAt(scene.position);
  }
);

function animate() {
  renderer.render(scene, camera);
}
</script>
