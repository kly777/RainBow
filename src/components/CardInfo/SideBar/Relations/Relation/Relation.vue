<template>
    <!-- 按钮组件，点击时调用cardStore的browseCard方法，传入relation的id -->
    <div class="relation">
        <button @click="cardStore.browseCard(relation.id)">
            {{ relation.title }}
        </button>
        <!-- v-btn组件，点击时调用routeToCard方法，传入relation的id -->
        <v-btn icon="mdi-arrow-down" size="super-small" variant="text" @click="routeToCard(relation.id)"></v-btn>
        <!-- v-btn组件，当props.edit为true时显示，点击时调用cardStore的deleteRelation方法，传入relation的relation_id -->
        <EditRelation v-if="props.edit" :relation="props.relation" />
        <v-btn v-if="props.edit" class="delete" icon="mdi-delete" size="x-small"
            @click="cardStore.deleteRelation(relation.relation_id)">
        </v-btn>
    </div>
</template>

<script setup>
import { useCardStore } from "../../../card.ts"; // 导入cardStore
import { useRouter } from "vue-router"; // 导入router
import EditRelation from "./EditRelation.vue";

const router = useRouter(); // 初始化router

// 定义props，包括relation对象和edit布尔值
const props = defineProps({
    relation: Object,
    edit: Boolean,
});

const cardStore = useCardStore(); // 初始化cardStore

// 定义routeToCard方法，使用router的push方法导航到Card页面，传入card_id参数
function routeToCard(id) {
    router.push({ name: "CardInfo", params: { card_id: id } });
}
</script>

<style scoped>
button {
    background-color: #ffffff;
    cursor: pointer;
    margin: 2px;
}

.relation {
    border-top: #dadada 1px solid;

    height: auto;
    margin: 2px;
}
</style>
