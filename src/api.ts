import req from "@/utils/req";


export interface Card {
    id: number;
    title: string;
    content: string;
    relation: Card_Relation
    priority: number;
    tags: Tag[]
}
export interface Card_Relation {
    parents: Card_Relation_PC[];
    children: Card_Relation_PC[];
}
export interface Card_Relation_PC {
    id: number;
    type: string,
    description: string,
    priority: number,
    card: Card_Relation_Card;
}

interface Card_Relation_Card {
    id: number;
    title: string;
    priority: number;
}

export interface Todo {
    id: number;
    card: Card
    priority: number;
    state: number;
    full_time: boolean;
    start: Date;
    end: Date;
}

export interface Relation {
    parent: number,
    child: number,
    type: string,
    description: string,
    priority: number,
}

export interface Review {
    id: number;
    card: Card
    state: number;
}

export interface Tag {
    id: number;
    tag: Card;
    card: Card;
}

export class RelationAPI {
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


export class CardAPI {
    static async get(id: string | number): Promise<Card | null> {
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

export class TodoAPI {
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
            const res = await req.post<Todo>('/todo/', { card: cardId });
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
