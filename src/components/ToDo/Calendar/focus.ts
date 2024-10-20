import {defineStore} from "pinia";
import {ref, watch} from "vue";
import {useToDoStore} from "../todo";


export const useFocusStore = defineStore("focusDay", () => {
    const focus = ref(new Date());


    const firstDayOfTable = ref(new Date());

    function getFirstDayOfTable() {
        const data = new Date(focus.value);
        data.setDate(
            data.getDate() - data.getDay() - (data.getDay() ? 6 : 13)
        );
        firstDayOfTable.value = data;
    }

    watch(focus, () => {
        getFirstDayOfTable();
    });
    getFirstDayOfTable();

    watch(firstDayOfTable, () => {
        const ToDoStore = useToDoStore();
        ToDoStore.getToDos(firstDayOfTable.value);
    })


    function prevDay() {
        const date = new Date(focus.value);
        date.setDate(date.getDate() - 1);
        focus.value = date;
    }

    function nextDay() {
        const date = new Date(focus.value);
        date.setDate(date.getDate() + 1);
        focus.value = date;
    }

    // 上一周
    function prevWeek() {
        const date = new Date(focus.value);
        date.setDate(date.getDate() - 7);
        focus.value = date;
    }

    // 下一周
    function nextWeek() {
        const date = new Date(focus.value);
        date.setDate(date.getDate() + 7);
        focus.value = date;
    }

    function backToday() {
        focus.value = new Date();
    }

    return {
        focus,
        firstDayOfTable,
        prevDay,
        nextDay,
        prevWeek,
        nextWeek,
        backToday,
    };
});

