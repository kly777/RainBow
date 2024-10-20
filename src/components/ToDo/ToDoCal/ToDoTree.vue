<template>
  <el-input v-model="filterText" style="width: 240px"/>
  <v-divider/>
  <el-tree
      ref="treeRef"
      :data="ToDoStore.all_todos"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      default-expand-all
      node-key="id"
      style="max-width: 300px"
  >
    <template #default="{ node, data }">
      <input v-model="data.status" :value="data.id" type="checkbox"/>
      <span
          :class="{ 'is-active': data.status === 1 }"
          class="custom-tree-node"
      >
                <span>{{ node.label }}</span>
                <span>
                    <a @click=""> 加 </a>
                    <a @click=""> 完成 </a>
                </span>
            </span>
    </template>
  </el-tree>
</template>

<script setup>
import {useToDoStore} from "../todo";
import {onMounted, ref, watch} from "vue";

const ToDoStore = useToDoStore();

const filterText = ref("");
const treeRef = ref(null);
const defaultProps = {
  children: "children",
  label: "title",
};

watch(filterText, (val) => {
  if (treeRef.value) {
    treeRef.value.filter(val);
  }
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.title.includes(value);
};

onMounted(async () => {
  await ToDoStore.getAllToDos();
  treeRef.value.setCheckedNodes(
      ToDoStore.all_todos.filter((item) => item.status === 1)
  );
});
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.is-active {
  background-color: #409eff;
}
</style>
