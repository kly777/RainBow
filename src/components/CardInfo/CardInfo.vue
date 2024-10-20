<template>
    <div>
        <Header />
        <div class="card-container">
            <div v-show="isSidebarVisible || isSidebarOpen" ref="target" :class="{
                animate__fadeOutLeft: isLeaving && !isSidebarVisible,
                animate__fadeInLeft: !isSidebarVisible && !isLeaving,
            }" class="sidebar-container animate__animated animate__faster" @click="toggleSidebar">
                <SideBar class="sidebar" />
            </div>
            <div class="card-content">
                <Card class="card" />
            </div>
        </div>


        <v-btn v-if="!isSidebarVisible" class="sidebar-toggle-button" icon="mdi-page-layout-sidebar-left" size="x-small"
            @click="toggleSidebar">
        </v-btn>
        <div v-if="isSidebarOpen && !isSidebarVisible" :class="{ animate__fadeOut: isLeaving }"
            class="overlay animate__animated animate__fadeIn" @click="toggleSidebar"></div>
    </div>
</template>

<script setup lang="ts">
import "animate.css";

import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import Header from "./Header.vue";
import SideBar from "./SideBar/SideBar.vue";
import Card from "./Card/Card.vue";

import { useCardStore } from "./card";

import { useWindowSize } from "@vueuse/core";

const cardStore = useCardStore();
const route = useRoute();

const updateTitle = () => {
    if (cardStore.card) {
        document.title = cardStore.card.title;
    }
};

onMounted(async () => {
    updateTitle();
    try {
        await cardStore.getCard(route.params.card_id);
    } catch (error) {
        console.error("未能获取卡片信息", error);
    }
});

watch(() => cardStore.card, updateTitle);

const windowSize = useWindowSize();

watch(
    () => route.params.card_id,
    async (newCardId) => {
        try {
            await cardStore.getCard(newCardId);
        } catch (error) {
            console.error("未能获取卡片信息", error);
        }
    }
);

const isSidebarVisible = computed(() => windowSize.width.value >= 768);

const isSidebarOpen = ref(false);
const isLeaving = ref(false);
const toggleSidebar = () => {
    if (isSidebarOpen.value) {
        isLeaving.value = true;
        setTimeout(() => {
            try {
                isSidebarOpen.value = !isSidebarOpen.value;
                console.log("Sidebar toggled:", isSidebarOpen.value);
            } catch (error) {
                console.error("Error toggling sidebar:", error);
            }
        }, 700);
    } else {
        isLeaving.value = false;
        isSidebarOpen.value = !isSidebarOpen.value;
        console.log("Sidebar toggled:", isSidebarOpen.value);
    }
};
</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    min-height: 85vh;

    margin: 5px 0;
    border-top: #e1e0e0 1px solid;
    border-bottom: #e1e0e0 1px solid;
}

.card {
    margin: 5px;
    position: relative;
}

.card-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.sidebar {
    position: sticky;
    top: 50px;
}

@media (max-width: 768px) {
    .card-container {
        grid-template-columns: 100%;
    }

    .sidebar-container {
        position: fixed;
        top: 5vh;
        left: 0;
        width: max(35%, 250px);
        height: 100vh;
        background-color: #ffffff;
        z-index: 200;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

        overflow-y: auto;
        border-radius: 9px;
    }
}

.sidebar-container {
    border-right: #e1e0e0 1px solid;
}

.sidebar-toggle-button {
    position: fixed;
    bottom: 70px;
    right: 20px;
    z-index: 99;
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
