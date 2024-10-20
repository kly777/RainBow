<template>
  <md-editor v-model="content" :codeStyleReverse="false" :toolbarsExclude="['htmlPreview', 'github']" class="editor"
    editorId="id" previewTheme="github" @onChange="onChange" @onSave="onSave" />
</template>

<script setup>
import { config, MdEditor } from "md-editor-v3";
import { lineNumbers } from "@codemirror/view";
import { computed, ref } from "vue";
import "md-editor-v3/lib/style.css";
import { useCardStore } from "../card.ts";
import { useWindowSize } from "@vueuse/core";
import { ElNotification } from "element-plus";

config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  },
});

const cardStore = useCardStore();
// 定义组件的状态
const content = ref(cardStore.card.content);

// 定义方法
function onChange(val) {
}

const windowSize = useWindowSize();
computed(() => windowSize.width.value > 1104);
const onSave = async (v, h) => {
  try {
    await cardStore.updateContent(cardStore.card.id, v);
    ElNotification({
      title: "成功",
      message: "内容更新成功",
    });
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
.editor {
  height: calc(100vh - 50px);
}

.editor ::v-deep(.md-editor-toolbar-left) {
  display: inline;
  border-right: 1px solid #e3e3e3;
}

.editor ::v-deep(.md-editor-toolbar-right) {
  display: inline;
}

.editor ::v-deep(.md-editor-divider) {
  height: 1.8em;
}

.editor ::v-deep(.cm-scroller) {
  font-family: "Sarasa Term SC", monospace !important;
  font-size: 16px;
}
</style>
