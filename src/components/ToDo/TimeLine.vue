<template>
  <v-container>
    <v-row class="day-row">
      <v-col v-for="day in days" :key="day" class="day-column">
        <v-card class="day-card">
          {{ day }}
        </v-card>
      </v-col>
    </v-row>

    <v-row v-for="todo in todoStore.todos" :key="todo.id" align="center">
      <v-col v-if="todo.start_time && todo.end_time">
        <div :style="computedLocation(todo)" class="todo-item">
          <v-sheet :height="30" class="mx-auto" color="primary">
            <sheet-footer>
              {{ todo.title }}
            </sheet-footer>
            <v-tooltip :text="todo.title" activator="parent"></v-tooltip>
          </v-sheet>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import dayjs from "dayjs";
import {useToDoStore} from "./todo.ts";
import {useFocusStore} from "./Calendar/focus.ts";

const todoStore = useToDoStore();
const focusStore = useFocusStore();
const days = ref([])


function getRange() {
  days.value = []
  for (let i = -2; i < 7; i++) {
    days.value.push(dayjs(focusStore.focus).add(i, 'days').format('DD'));
  }
}

getRange()

function createOffsetDate(offsetDays) {
  const date = new Date(focusStore.focus)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + offsetDays);
  return date;
}

// 使用上面定义的函数来创建 left 和 right
const left = ref(createOffsetDate(-2));

const right = ref(createOffsetDate(7));


watch(() => focusStore.focus, () => {
  getRange();
  left.value = createOffsetDate(-2);
  right.value = createOffsetDate(7);
});


// 计算位置的函数
const calculateLeft = computed(() => (t) => {
  const time = new Date(t);
  const percentage = ((time.getTime() - left.value.getTime()) / (right.value.getTime() - left.value.getTime()));
  return Math.max(0, Math.min(percentage, 100));
});

const calculateRight = computed(() => (t) => {
  const time = new Date(t);
  const percentage = ((right.value.getTime() - time.getTime()) / (right.value.getTime() - left.value.getTime()));
  return Math.max(0, Math.min(percentage, 100));
});

const computedLocation = computed(() => (todo) => {
  return {
    marginLeft: calculateLeft.value(todo.start_time) * 100 + '%',
    marginRight: calculateRight.value(todo.end_time) * 100 + '%',
  }
})

</script>

<style scoped>
.day-row {
  width: auto;
  flex-wrap: nowrap;
}


.mx-auto {
  width: auto;

}


.day-column {
  width: auto;
}

.day-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}
</style>