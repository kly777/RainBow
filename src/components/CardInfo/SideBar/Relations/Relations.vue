<template>
    <div class="all-relations">
        <div class="d-flex justify-right">
            <v-btn class="add-relation-container" icon="mdi-plus" size="super-small" @click="createRelation('unknown')">
            </v-btn>
        </div>
        <div v-for="(relations, type) in sortedRelations" class="relations-main">
            {{ type }} x{{ relations.length }}
            <v-btn class="add-relation" color="primary" icon="mdi-plus" size="super-small" variant="text"
                @click="createRelation(type)">
            </v-btn>
            <div v-for="relation in relations" class="relation-item">
                <Relation :edit="props.edit" :relation="relation" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Relation from "./Relation/Relation.vue";
import { useCardStore } from "../../card.ts";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const cardStore = useCardStore();

// 定义组件的 props
const props = defineProps({
    edit: {
        type: Boolean,
        default: false,
    },
    relations: {
        type: Array,
    },
    relations_type: {},
});

// 计算属性，用于对 relations 按类型进行分组
const sortedRelations = computed(() => {
    const relations = props.relations;
    if (!relations || !Array.isArray(relations)) return {};
    // 创建一个对象来存储不同类型的元素
    const typedRelations = {};
    // 遍历 relation 数组
    relations.forEach((relation) => {
        if (relation.type) {
            // 如果对应的 type 还没有在 typedRelations 中创建数组，则创建一个空数组
            if (!typedRelations[relation.type]) {
                typedRelations[relation.type] = [];
            }
            // 将当前元素添加到对应类型的数组中
            typedRelations[relation.type].push(relation);
        }
    });
    return typedRelations;
});

// 创建新的 relation
async function createRelation(type) {
    try {
        // 使用 await 等待 Promise 解析
        const newCardId = await cardStore.createCard();
        // 现在 newCardId 已经是一个确定的值
        if (props.relations_type === "parents") {
            await cardStore.addRelation(
                type,
                newCardId,
                cardStore.relation_card.id
            );
        } else if (props.relations_type === "children") {
            await cardStore.addRelation(
                type,
                cardStore.relation_card.id,
                newCardId
            );
        }
        routeToCard(newCardId);
    } catch (error) {
        // 处理可能出现的错误
        console.error("Error creating card:", error);
    }
}

// 路由到指定的卡片页面
function routeToCard(id) {
    router.push({ name: "CardInfo", params: { card_id: id } });
}
</script>

<style scoped>
.relations-main {
    border-top: 1px solid #7c7c7c;
    padding: 3px;
    border-bottom: 1px solid #c0c0c0;
    margin: 5px;
}

.all-relations {
    border-top: #bbbbbb 2px solid;
    justify-content: flex-end;
}
</style>
