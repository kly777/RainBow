<template>
    <div class="cardPlay">
        <SearchCard />
        <div class="cardContainer">
            <RouterLink v-for="card in cards" :key="card.id" :to="{ name: 'CardInfo', params: { card_id: card.id } }">
                <div class="card">{{ card.title }}</div>
            </RouterLink>
            <AddCard />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import req from "../../utils/req.ts";
import SearchCard from "./SearchCard.vue";
import AddCard from "./AddCard.vue";
import { useCardStore } from "../CardInfo/card.ts";

const cardStore = useCardStore();

const cards = computed(() => cardStore.cardPlay);
onMounted(async () => {
    await getCard();
});

async function getCard() {
    try {
        const response = await req("card/?is_root=true");

        if (response && Array.isArray(response.data)) {
            cardStore.cardPlay = response.data;
        } else {
            console.error("Unexpected data format or no data returned.");
        }
    } catch (error) {
        if (error.response) {
            console.error(
                "未能获取到卡片数据。 Status:",
                error.response.status
            );
        } else {
            console.error("未能获取到卡片数据。Error:", error.message || error);
        }
    }
}
</script>

<style scoped>
.card {
    margin: 5px;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 7px;
    background-color: #ffffff;
    cursor: pointer;
}

.cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    margin: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.cardPlay {
    padding: 10px 30px;
}
</style>
