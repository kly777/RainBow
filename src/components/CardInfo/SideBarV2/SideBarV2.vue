<template>
    <div class="side">
        <div class="d-flex justify-left">
            <AddRelation style="margin-right: 10px" />
            <v-btn
                density="compact"
                icon="mdi-pencil"
                @click="toggleEdit"
            ></v-btn>
        </div>
        <div class="relation-item">
            <button @click="browseCard">
                {{ cardTitle }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入所需的组件和库
import AddRelation from "./AddRelation.vue";

import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCardStore } from "../card";

const cardStore = useCardStore();
const router = useRouter();
const edit = ref(false);

// 计算属性
const parents = computed(() => cardStore.relation_card.relation.parents);
const children = computed(() => cardStore.relation_card.relation.children);
const cardTitle = computed(() => cardStore.relation_card.title);

// 定义一个函数，用于切换编辑状态
function toggleEdit() {
    edit.value = !edit.value;
}

// 定义一个函数，用于浏览卡片
function browseCard() {
    try {
        cardStore.browseCard(cardStore.relation_card.id);
    } catch (error) {
        console.error("浏览卡片时出错:", error);
    }
}
</script>

<style scoped>
.side {
    width: auto;
    height: auto;
    padding: 10px;
}

.relation-item {
    margin: 2px;
    padding: 5px;
    border-top: 1px solid #b7b7b7;

    align-items: center;
    justify-content: space-between;
}
</style>

<style></style>
