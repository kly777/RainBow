import {defineStore} from "pinia";
import {ref} from "vue";
import req from "@/utils/req";
import type {Card} from "@/API/interface";
import RelationAPI from "@/API/relation";

export const useCardStore = defineStore("card", () => {

    const card = ref<Card>({
        id: 0,
        title: "",
        content: "",
        relation: {
            parents: [],
            children: [],
        },
        priority: 0,
        tags: []
    });

    const relation_card = ref<Card >({
        id: 0,
        title: "",
        content: "",
        relation: {
            parents: [],
            children: [],
        },
        priority: 0,
        tags: []
    });

    const cardCache = new Map();

    const cardPlay = ref([{
        id: 0,
        title: "Loading...",
    }]);


    async function fetchCard(id: string | number) {
        if (!id) {
            console.error("无效的id");
            return null;
        }
        if (cardCache.has(id)) {
            return cardCache.get(id);
        }
        try {
            const res = await req.get(`/card/${id}/`);
            const cardData = res.data;
            // 将获取到的卡片数据存入缓存
            cardCache.set(id, cardData);
            return cardData;
        } catch (error) {
            // 检查错误类型
            console.error("获取Card失败:", error);
            return null;
        }
    }


    async function getCard(id: string | number) {
        try {
            const cardData = await fetchCard(id);
            if (cardData) {
                card.value = cardData;
                relation_card.value = cardData;
            }
        } catch (error) {
            console.error("获取Card失败:", error);
            throw new Error("获取Card失败"); // 抛出错误以便调用者处理
        }
    }

    async function browseCard(id: number) {
        const cardData = await fetchCard(id);
        if (cardData) {
            card.value = cardData;
        }
    }

    async function createCard() {
        try {
            const res = await req.post("/card/", {
                title: "New Card",
                content: "Start typing here...",
            });
            return res.data.id;
        } catch (error) {
            console.error("创建Card失败:", error);
            throw new Error("创建Card失败"); // 抛出错误以便调用者处理
        }
    }

    async function updateContent(id: number, content: string) {
        try {
            await req.patch(`/card/${id}/`, {content});
            // 更新缓存中的内容
            if (cardCache.has(id)) {
                const cachedCard = cardCache.get(id);
                cachedCard.content = content;
                cardCache.set(id, cachedCard);
            }
            await browseCard(id);
        } catch (error) {
            console.error(`更新内容失败: ID ${id}`, error);
            throw new Error(`更新内容失败: ID ${id}`); // 抛出错误以便调用者处理
        }
    }

    async function updateTitle(id: number, title: string) {
        try {
            await req.patch(`/card/${id}/`, {title});
            // 更新缓存中的标题
            if (cardCache.has(id)) {
                const cachedCard = cardCache.get(id);
                cachedCard.title = title;
                cardCache.set(id, cachedCard);
            }
        } catch (error) {
            console.error(`更新标题失败: ID ${id}`, error);
            throw new Error(`更新标题失败: ID ${id}`); // 抛出错误以便调用者处理
        }
    }

    async function deleteCard(id: number) {
        try {
            await req.delete(`/card/${id}/`);
            cardCache.delete(id); // 直接删除缓存中的卡片
        } catch (error) {
            console.error(`删除Card失败: ID ${id}`, error);
            throw new Error(`删除Card失败: ID ${id}`); // 抛出错误以便调用者处理
        }
    }

    async function deleteRelation(id: number) {
        try {
            await req.delete(`/card/relation/${id}/`);
        } catch (error) {
            console.error(`未能删除关系 ID: ${id}`, error);
            throw new Error(`未能删除关系 ID: ${id}`); // 抛出错误以便调用者处理
        }
    }

    async function addRelation(
        type: string,
        parent_id: number,
        child_id: number
    ) {
        await RelationAPI.addRelation({ parent: parent_id, child: child_id, type: type });
    }

    async function addRelationOf(
        type: string,
        id: number,
        main_id: number,
        relation: string
    ) {
        if (relation === "parent") {
            await addRelation(type, id, main_id);
        } else if (relation === "child") {
            await addRelation(type, main_id, id);
        }
    }

    async function updateRelation(
        id: number,
        type: string,
        parent_id: number,
        child_id: number
    ) {
        try {
            await req.patch("/card/relation/" + id + "/", {
                type: type,
                parent: parent_id,
                child: child_id,
            });
        } catch (error) {
            console.error(`未能更新关系 ID: ${id}`, error);
            throw error;
        }
    }

    return {
        card,
        getCard,
        createCard,
        deleteCard,
        browseCard,
        cardPlay,

        updateTitle,
        updateContent,

        relation_card,
        deleteRelation,
        addRelation,
        addRelationOf,
        updateRelation,
    };
});
