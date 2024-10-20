<script setup>
import { useCardStore } from "../CardInfo/card.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const cardStore = useCardStore();

async function addCard() {
  const id = await cardStore.createCard();
  await router.push({ path: "/card/" + id });
}
</script>

<template>
  <div>
    <v-btn icon="mdi-plus" size="x-small" @click="addCard()"></v-btn>
  </div>
</template>
