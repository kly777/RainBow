import req from "@/utils/req";
import type { Card } from "./interface";

class CardAPI {
    static async get(id: string | number): Promise<Card|null> {
        if (!id) {
            console.error("无效的id");
            return null;
        }
        try {
            const res = await req.get<Card>(`/card/${id}/`);
            return res.data;
        } catch (error) {
            console.error("获取Card失败:", error);
            return null;
        }
    }

    static async create(title: string = "New Card", content: string = "Start typing here..."): Promise<number> {
        try {
            const res = await req.post<{ id: number }>("/card/", { title, content });
            return res.data.id;
        } catch (error) {
            console.error("创建Card失败:", error);
            throw new Error("创建Card失败");
        }
    }

    static async update(id: number, data: Partial<Card>): Promise<void> {
        try {
            await req.patch(`/card/${id}/`, data);
        } catch (error) {
            console.error(`更新Card失败: ID ${id}`, error);
            throw new Error(`更新Card失败: ID ${id}`);
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            await req.delete(`/card/${id}/`);
        } catch (error) {
            console.error(`删除Card失败: ID ${id}`, error);
            throw new Error(`删除Card失败: ID ${id}`);
        }
    }
}

export default CardAPI;





