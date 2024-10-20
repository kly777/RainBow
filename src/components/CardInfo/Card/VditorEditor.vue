<template>
  <div :class="{ 'card-editor-editing': isEditing }" class="card-editor">
    <div ref="vditorContainer" class="vditor-container">
      <div
          v-show="!isEditing"
          ref="preview"
          class="preview"
      ></div>
      <div
          v-show="isEditing"
          ref="vditorWrapper"
          class="vditor"
      ></div>
    </div>
    <div
        v-show="isOutlineVisible || isOutlineOpen"
        class="outline-container"
        @click="toggleOutline"
    >
      <div class="outline-wrapper">
        <div
            v-show="!isEditing"
            ref="outline"
            class="outline"
            style="display: block"
            @click.capture="isOutlineOpen = false"
        ></div>
      </div>
    </div>

    <v-btn
        v-if="!isOutlineVisible"
        class="outline-toggle-button"
        icon="mdi-page-layout-sidebar-right"
        size="x-small"
        @click="toggleOutline"
    >
    </v-btn>
    <div
        v-if="isOutlineOpen && !isOutlineVisible"
        class="overlay"
        @click="toggleOutline"
    ></div>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import {useCardStore} from "../card.ts";
import {useRoute} from "vue-router";
import {ElNotification} from "element-plus";

import {useWindowSize} from "@vueuse/core";

const windowSize = useWindowSize();
const cardStore = useCardStore();
const props = defineProps({
  isEditing: Boolean,
});

const vditorContainer = ref(null);
const preview = ref(null);
const vditorWrapper = ref(null);
const outline = ref();
const route = useRoute();

defineExpose({updateValue});

async function updateValue() {
  try {
    if (vditorInstance && vditorInstance.getValue) {
      const value = await vditorInstance.getValue(); // 异步获取编辑器的内容
      if (cardStore.card.id && cardStore.updateContent) {
        try {
          await cardStore.updateContent(cardStore.card.id, value);
          await setupPreview();
          ElNotification({
            title: "成功",
            message: "内容更新成功",
          });
        } catch (error) {
          console.error("Error updating content:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error updating content:", error);
  }
}

let vditorInstance;

async function initVditor() {
  if (!cardStore.card.id) {
    console.error("Card ID is not set");
    return;
  }
  vditorInstance = new Vditor(vditorWrapper.value, {
    lang: "zh_CN",
    cache: {
      id: cardStore.card.id,
    },
    counter: {
      enable: true,
    },
    outline: {
      enable: false,
      position: "left",
    },
    toolbarConfig: {
      pin: true,
    },
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "|",
      "upload",
      "record",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullscreen",
      "edit-mode",
      "outline",
      {
        name: "more",
        toolbar: ["both", "export", "preview", "devtools"],
      },
    ],
    typewriterMode: true,

    preview: {
      hljs: {
        lineNumber: true,
      },
      markdown: {
        autoSpace: true,
      },
    },
    tab: "\t",
    after: async () => {
      try {
        setVditorValue();
        await setupPreview();
        await setupOutline();

      } catch (error) {
        console.error("Error initializing Vditor:", error);
      }
    },
  });
}

function setVditorValue() {
  if (vditorInstance) {
    vditorInstance.setValue(cardStore.card.content);
  }
}

async function setupPreview() {
  if (!vditorInstance) return;

  try {
    const options = {
      hljs: {
        lineNumber: isOutlineVisible.value,
      },
      markdown: {
        autoSpace: true,
      },
    };
    await Vditor.preview(preview.value, cardStore.card.content, options);
  } catch (error) {
    console.error("Error setting up preview:", error);
  }
}


async function setupOutline() {
  Vditor.outlineRender(preview.value, outline.value);
}


// 组件卸载时清理 Vditor 实例
onUnmounted(() => {
  vditorInstance?.destroy();
});

onMounted(async () => {
  if (cardStore.card.id) {
    await initVditor();
  }
});

watch(() => cardStore.card.id, async () => {
  await initVditor();
});

const isOutlineOpen = ref(false);

function toggleOutline() {
  isOutlineOpen.value = !isOutlineOpen.value;
}

const isOutlineVisible = computed(() => windowSize.width.value > 1104);
</script>

<style scoped>
.card-editor {
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-gap: 16px;
}

.vditor-container {
  min-width: 0;
}

.vditor {
  border: none !important;
}

.vditor-container ::v-deep(.vditor-reset) {
  line-height: 1.8 !important;
}

.preview {
  min-height: 300px;
  padding: 0;
  margin: 0 20px !important;
}

.outline-container {
  border-left: 1px solid #e5e5e5;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
}

.card-editor-editing {
  grid-template-columns: 100%;
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

  .vditor ::v-deep(.vditor-reset) {
    padding: 10px 20px !important;

  }
}

.outline-wrapper {
  height: 90vh;
  overflow-y: scroll;
  position: sticky;
  top: 50px;
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

.vditor ::v-deep(.vditor-toolbar) {
  top: 30px; /* 工具栏顶部距离 */
  z-index: 150; /* 确保工具栏在其他元素之上 */
  border-radius: 8px; /* 设置圆角 */
  background-color: #f8f8f8; /* 背景色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 5px 10px !important; /* 内边距 */
  margin: 9px;
}

</style>
