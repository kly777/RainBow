import {defineStore} from "pinia";
import {ref} from "vue";

// 定义一个名为todo的store

export const useToDoStore = defineStore("todo", () => {

    const todo = ref([]);

    const all_todo = ref()

    return {
        all_todo,
        todo,
    };
});
