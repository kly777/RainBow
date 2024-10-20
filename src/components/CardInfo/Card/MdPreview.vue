<template>
  <div class="card-editor">
    <md-preview v-model="content" :codeStyleReverse="false" editorId="id" previewTheme="github" />
    <div v-show="isOutlineVisible || isOutlineOpen" :class="{
      animate__fadeOutRight: isLeaving && !isOutlineVisible,
      animate__fadeInRight: !isOutlineVisible && !isLeaving,
    }" class="outline-container animate__animated animate__faster" @click="toggleOutline">
      <div class="outline-wrapper">
        <md-catalog :offsetTop="70" :scrollElement="scrollElement" :scrollElementOffsetTop="70" class="outline"
          editorId="id" />
      </div>
    </div>
    <v-btn v-if="!isOutlineVisible" class="outline-toggle-button" icon="mdi-page-layout-sidebar-right" size="x-small"
      @click="toggleOutline">
    </v-btn>
    <div v-if="isOutlineOpen && !isOutlineVisible" :class="{ animate__fadeOut: isLeaving }"
      class="overlay animate__animated animate__fadeIn" @click="toggleOutline"></div>
  </div>
</template>

<script setup>
import "animate.css";
import { computed, ref } from "vue";
import { MdCatalog, MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useCardStore } from "../card.ts";
import { useWindowSize } from "@vueuse/core";

const cardStore = useCardStore();

const scrollElement = document.documentElement;
// 定义组件的状态
const content = computed(() => cardStore.card.content);

// 定义方法

const isOutlineOpen = ref(false);

const toggleOutline = () => {
  if (isOutlineOpen.value) {
    isLeaving.value = true;
    setTimeout(() => {
      try {
        isOutlineOpen.value = !isOutlineOpen.value;
        console.log("Sidebar toggled:", isOutlineOpen.value);
      } catch (error) {
        console.error("Error toggling sidebar:", error);
      }
    }, 700);
  } else {
    isLeaving.value = false;
    isOutlineOpen.value = !isOutlineOpen.value;
    console.log("Sidebar toggled:", isOutlineOpen.value);
  }
};
const windowSize = useWindowSize();
const isOutlineVisible = computed(() => windowSize.width.value > 1104);

const isLeaving = ref(false);
</script>

<style scoped>
.card-editor {
  display: grid;
  grid-template-columns: 5fr minmax(16%, 250px);
  min-height: calc(100vh - 200px);
}

.outline-container {
  border-left: 1px solid #e5e5e5;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
}

.outline-wrapper {
  height: 90vh;
  overflow-y: scroll;
  position: sticky;
  top: 50px;
}

@media (max-width: 1104px) {
  .card-editor {
    grid-template-columns: 100%;
  }

  .outline-container {
    position: fixed;
    top: 5vh;
    right: 0;
    width: max(35%, 250px);
    height: 100vh;
    background-color: #ffffff;
    z-index: 200;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
    border-radius: 9px;
  }
}

.outline {
  padding: 16px;
}

.outline ::v-deep(.md-editor-catalog-link span:hover) {
  color: #000000;
}

.outline ::v-deep(.md-editor-catalog-link span) {
  color: #5e5e5e;

  :hover {
    color: #000000;
  }
}

.outline-toggle-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 175;
}
</style>
