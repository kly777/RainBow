<template>
  <div>
    <v-btn density="compact" icon="mdi-plus" @click="dialog = true"></v-btn>
    <v-dialog v-model="dialog" width="50%">
      <v-card class="dialog-card">
        <v-card-title>Add Relation</v-card-title>
        <v-card-text>
          <v-radio-group v-model="relation" inline>
            <v-radio label="parent" value="parent"></v-radio>
            <v-radio label="child" value="child"></v-radio>
          </v-radio-group>
          <v-autocomplete
              v-model="type"
              :items="['>', '.', '->', '/']"
              label="Type"
          >
          </v-autocomplete>
          <v-text-field v-model="idInput" label="ID"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addRelation()"
          >Add Relation
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useCardStore} from "../card.ts";

const dialog = ref(false);

const cardStore = useCardStore();

const relation = ref("parent");
const type = ref("");
const idInput = ref("");

function addRelation() {
  if (!type.value || !idInput.value) {
    alert("Please fill in all fields.");
    return;
  }
  if (relation.value === "parent") {
    cardStore.addRelation(
        type.value,
        idInput.value,
        cardStore.relation_card.id
    );
  } else if (relation.value === "child") {
    cardStore.addRelation(
        type.value,
        cardStore.relation_card.id,
        idInput.value
    );
  }
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
