<template>
  <div>
    <v-text-field v-model="searchQuery" label="Search" @input="Search" />
    <div v-if="searchQuery" class="bar">
      <v-list v-if="searchQuery" dense class="pa-3">
        <v-list-item v-for="(item, index) in searchResults" :key="index" link @click="() => {
          router.push({
            name: 'CardInfo',
            params: { card_id: item.id },
          });
        }
          ">
          <v-list-item-title>{{ item.id }} {{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import req from "../../utils/req.ts";
import { useRouter } from "vue-router";

const router = useRouter();

// 定义搜索查询的状态
const searchQuery = ref("");
const searchResults = ref([]);

onMounted(() => {
  // 初始化搜索结果为空数组
  searchResults.value = [];
});

async function Search() {
  try {
    const encodedQuery = encodeURIComponent(searchQuery.value);
    const response = await req.get("/search/?q=" + encodedQuery);
    searchResults.value = response.data;
  } catch (error) {
    console.error("Error during search:", error);
    // 可以选择在这里显示错误信息给用户，或者记录日志等
    searchResults.value = ["No results found"];
  }
}
</script>

<style scoped>
.search-overlay p {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.bar {
  position: relative;
  width: 100%;
  height: 100%;
}

.pa-3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: #333 1px solid;
}
</style>
