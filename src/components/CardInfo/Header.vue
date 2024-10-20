<template>
  <h2 class="header" style="margin-left: 10px;">
    {{ cardStore.relation_card.title }}
  </h2>
  <h3 v-if="cardStore.card.id !== cardStore.relation_card.id" class="header">
    >>> {{ cardStore.card.title }}
  </h3>
</template>

<script setup>
import { useCardStore } from "./card.ts";

const cardStore = useCardStore();
</script>

<style scoped>
.header {
  display: inline;
}
</style>