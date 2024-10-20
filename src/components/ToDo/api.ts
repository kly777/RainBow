import {ElNotification} from "element-plus";
import req from "../../utils/req";
import dayjs from "dayjs";
import {h} from "vue";

export async function getToDos(firstDayOfTable: Date) {
    try {
        if (!firstDayOfTable || isNaN(firstDayOfTable.getTime())) {
            console.error("无效的日期参数");
            return;
        }
        // 发送GET请求，获取待办事项
        const res = await req.get("/todo-cal/",
            {
                params: {
                    s_time: dayjs(firstDayOfTable).format("YYYY-MM-DD"),
                    e_time: dayjs(firstDayOfTable).add(35, "days").format("YYYY-MM-DD"),
                }
            }
        );
        // 将获取到的待办事项赋值给todos变量
        const todo = res.data.sort((a: any, b: any) => {
            const dateA = new Date(a.end_time);
            const dateB = new Date(b.end_time);
            return dateA.getTime() - dateB.getTime();
        });
        return todo;
    } catch (error: any) {
        console.error("获取待办事项失败：", error);
    }
}

export async function getAllToDos() {
    try {
        // 发送GET请求，获取待办事项
        const res = await req.get("/todo-cal/");
        // 将获取到的待办事项赋值给todo变量
        const all_todo = res.data.sort((a: any, b: any) => {
            const dateA = new Date(a.end_time);
            const dateB = new Date(b.end_time);
            return dateA.getTime() - dateB.getTime();
        });
        console.log(res.data);
        return all_todo

    } catch (error: any) {
        // 检查 error.response 是否存在
        if (error.response) {
            console.error("获取待办事项失败，状态码：", error.response.status);
            console.error("错误详情：", error.response.data);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error("请求已发出，但没有收到响应：", error.request);
        } else {
            // 其他错误
            console.error("获取待办事项失败：", error.message);
        }
    }
}

type ToDo = {
    title: string;
    content: string;
    status: number;
    priority: number;
    full_time: boolean;
    start_time: Date;
    end_time: Date;
    id: number;
}

// 添加待办事项
export async function addToDo(addedToDo: ToDo) {
    try {
        const res = await req.post("/todo-cal/", {
            addedToDo
        });
        console.log(res);
        ElNotification({
            title: "成功",
            message: h("i", {style: "color: teal"}, "新待办事项添加成功"),
        });
    } catch (error) {
        console.error("添加待办事项失败：", error);
    }
}

// 用于删除待办事项
export const archiveTodo = async (id: any) => {
    try {
        const response = await req.delete(`/todo-cal/${id}/`);
        ElNotification({
            title: "成功",
            message: h("i", {style: "color: teal"}, "Todo 已成功删除"),
        });
    } catch (error) {
        console.error("无法存档待办事项:", error);
    }
};

export async function finishTodo(id: number) {
    try {
        const res = await req.patch(`/todo-cal/${id}/`, {
            status: 1
        });
    } catch (error) {
        console.error("未能完成待办事项:", error);
    }
}

export async function updateToDo(id: any, updatedToDo: ToDo) {
    try {
        const res = await req.patch(`/todo-cal/${id}/`, {
            updatedToDo
        });
        ElNotification({
            title: "成功",
            message: h("i", {style: "color: teal"}, "待办事项更新成功"),
        });
    } catch (error) {
        console.error("更新待办事项失败：");
    }
}

export async function getToDo(id: number) {
    try {
        const res = await req.get(`/todo-cal/${id}/`);
        return res.data;
    } catch (error) {
        console.error("获取待办事项失败：", error);
    }
}