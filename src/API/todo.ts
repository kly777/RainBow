import req from "@/utils/req";
import type { Todo } from "./interface";
class TodoAPI {
    static async get(id: number): Promise<Todo | null> {
        try {
            const res = await req.get<Todo>(`/todo/${id}/`);
            return res.data;
        } catch (error) {
            console.error("获取Todo失败:", error);
            return null;
        }
    }

    static async getAll(): Promise<Todo[]> {
        try {
            const res = await req.get<Todo[]>('/todo/');
            return res.data;
        } catch (error) {
            console.error("获取所有Todo失败:", error);
            return [];
        }
    }

    static async create(cardId: number): Promise<Todo> {
        try {
            const res = await req.post<Todo>('/todo/', {card: cardId});
            return res.data;
        } catch (error) {
            console.error("创建Todo失败:", error);
            throw new Error("创建Todo失败");
        }
    }

    static async update(id: number, todoData: Partial<Todo>): Promise<Todo> {
        try {
            const res = await req.patch<Todo>(`/todo/${id}/`, todoData);
            return res.data;
        } catch (error) {
            console.error(`更新Todo失败: ID ${id}`, error);
            throw new Error(`更新Todo失败: ID ${id}`);
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            await req.delete(`/todo/${id}/`);
        } catch (error) {
            console.error(`删除Todo失败: ID ${id}`, error);
            throw new Error(`删除Todo失败: ID ${id}`);
        }
    }

    // 额外的方法：根据日期范围获取Todo
    // static async getByDateRange(start: Date, end: Date): Promise<Todo[]> {
    //     try {
    //         const res = await req.get<Todo[]>('/todo/', {
    //             params: {
    //                 start: start.toISOString(),
    //                 end: end.toISOString()
    //             }
    //         });
    //         return res.data;
    //     } catch (error) {
    //         console.error("获取日期范围内的Todo失败:", error);
    //         return [];
    //     }
    // }

    // 额外的方法：更新Todo状态
    static async updateState(id: number, state: number): Promise<Todo> {
        return this.update(id, { state });
    }
}

export default TodoAPI;
