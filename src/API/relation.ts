import req from "@/utils/req";
import type { Relation } from "./interface";

class RelationAPI {
    static async get(id: number): Promise<Relation | null> {
        try {
            const res = await req.get<Relation>(`/relation/${id}/`);
            return res.data;
        } catch (error) {
            console.error("获取Relation失败:", error);
            return null;
        }
    }

    static async getAll(): Promise<Relation[]> {
        try {
            const res = await req.get<Relation[]>('/relation/');
            return res.data;
        } catch (error) {
            console.error("获取所有Relation失败:", error);
            return [];
        }
    }

    static async create(relationData: Partial<Omit<Relation, 'id'>>): Promise<Relation> {
        try {
            const res = await req.post<Relation>('/relation/', relationData);
            return res.data;
        } catch (error) {
            console.error("创建Relation失败:", error);
            throw new Error("创建Relation失败");
        }
    }
    static async addRelation(relationData: Partial<Omit<Relation, 'id'>>): Promise<Relation> {
        try {
            const res = await req.post<Relation>('/relation/', relationData);
            return res.data;
        } catch (error) {
            console.error("添加Relation失败:", error);
            throw new Error("添加Relation失败");
        }
    }

    static async update(id: number, relationData: Partial<Relation>): Promise<Relation> {
        try {
            const res = await req.patch<Relation>(`/relation/${id}/`, relationData);
            return res.data;
        } catch (error) {
            console.error(`更新Relation失败: ID ${id}`, error);
            throw new Error(`更新Relation失败: ID ${id}`);
        }
    }

    static async delete(id: number): Promise<void> {
        try {
            await req.delete(`/relation/${id}/`);
        } catch (error) {
            console.error(`删除Relation失败: ID ${id}`, error);
            throw new Error(`删除Relation失败: ID ${id}`);
        }
    }

    // 额外的方法：获取特定卡片的所有关系
    static async getByCard(cardId: number): Promise<Relation[]> {
        try {
            const res = await req.get<Relation[]>('/relation/', {
                params: { card: cardId }
            });
            return res.data;
        } catch (error) {
            console.error(`获取卡片的关系失败: Card ID ${cardId}`, error);
            return [];
        }
    }
}

export default RelationAPI;