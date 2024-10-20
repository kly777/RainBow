<template>
  <v-btn density="compact" icon="mdi-menu" @click="dialog = true"></v-btn>
  <v-dialog v-model="dialog" width="50%">
    <v-card class="dialog-card">
      <v-autocomplete v-model="type" :items="['>', '.', '->', '/']" label="Type">
      </v-autocomplete>
      <v-btn color="primary" @click="editRelation()"> OK</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useCardStore } from "../../../card.ts";

const cardStore = useCardStore();
const props = defineProps({
  relation: Object,
});
const dialog = ref(false);
const type = ref(props.relation.type);

function editRelation() {
  props.relation.type = type.value;
  cardStore.updateRelation(props.relation.relation_id, type.value);
  dialog.value = false;
}
</script>

<style scoped>
.dialog-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
