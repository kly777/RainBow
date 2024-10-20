<template>
  <div class="card">
    <div class="top">
      <h5>id:{{ cardStore.card.id }}</h5>
      <div class="title">
        <input v-show="Edit" v-model="cardStore.card.title" style="padding: 5px; border: 1px solid #ccc" />
        <v-btn v-if="Edit" icon="mdi-rename" size="x-small" @click="
          cardStore.updateTitle(
            cardStore.card.id,
            cardStore.card.title
          )
          ">
        </v-btn>
        <v-btn v-if="Edit" class="delete" icon="mdi-delete-outline" size="x-small"
          @click="deleteCard(cardStore.card.id)">
        </v-btn>
        <v-btn v-if="Edit" icon="mdi-content-save-all" size="x-small" @click="VditorRef.updateValue()">
        </v-btn>
        <v-btn class="edit" icon="mdi-application-edit-outline" size="x-small" @click="Edit = !Edit">
        </v-btn>
      </div>
    </div>

    <v-divider thickness="2px"></v-divider>
    <!--    <VditorEditor-->
    <!--        ref="VditorRef"-->
    <!--        :isEditing="Edit"-->
    <!--        class="content"-->
    <!--        -->
    <!--    />-->
    <Transition mode="out-in">
      <MdPreview v-if="!Edit" />
      <MdEditor v-else />
    </Transition>
  </div>
  <v-fab v-show="showFab" class="uptop" icon="mdi-arrow-up-bold-circle-outline" size="small"
    @click="scrollToTop"></v-fab>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCardStore } from "../card.ts";
import { useRouter } from "vue-router";

import MdPreview from "./MdPreview.vue";
import MdEditor from "./MdEditor.vue";
import { ElMessage } from "element-plus";
import { useScroll } from "@vueuse/core";

const router = useRouter();
const Edit = ref(false);
const cardStore = useCardStore();

const VditorRef = ref();

function deleteCard(id) {
  try {
    // cardStore.deleteCard(id);
    router.push({ path: "/card" });
  } catch (error) {
    console.error("删除卡片失败:", error);
    ElMessage({
      message: "删除卡片失败",
      type: "error",
    });
  }
}

const { y } = useScroll(window);

const showFab = ref(false);

watch(y, (newY) => {
  showFab.value = newY > 300; // 当滚动距离大于100px时显示按钮
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.card {
  width: auto;
  height: auto;
  margin: 5px;
  position: relative;
}

.delete {
  background-color: red;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  margin-bottom: 10px;
  flex-flow: row wrap;
}

button {
  margin: 5px;
}

.uptop {
  position: fixed;
  right: 100px;
  bottom: 60px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit {
  position: fixed;
  bottom: 110px;
  right: 15px;
  z-index: 80;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
