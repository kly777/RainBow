<script setup lang="ts">
import { useDraggable } from "@vueuse/core";
import { ref, computed } from "vue";

const el = ref<HTMLElement | null>(null);

const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 40 },
    onEnd: (event) => {
        console.log(event);
    },
});

const position = computed(
    () => `(${Math.round(x.value)}, ${Math.round(y.value)})`
);
</script>

<template>
    <div ref="el" :style="[style, { position: 'fixed' }]" class="drag">
        拖动我！我的位置是 {{ position }}
    </div>
</template>

<style scoped>
.drag {
    width: 100px;
    height: 100px;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    cursor: move;
    user-select: none;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
