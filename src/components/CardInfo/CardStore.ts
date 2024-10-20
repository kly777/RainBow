import CardAPI from "@/API/card";
import RelationAPI from "@/API/relation";
import type { Card, Relation, Card_Relation } from "@/API/interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardStore = defineStore("card2", () => {
    const card = ref<Card>();
    const card_relation = ref<Card_Relation>();
    const cardCache = new Map();

    async function fetchCard(id: number) {
        await browseCard(id);
        if (card.value)
            card_relation.value = card.value.relation;
    }

    async function browseCard(id: number) {
        let newCard: Card
        if (cardCache.has(id)) {
            newCard = cardCache.get(id);
        }
        else {
            const neoCard = await CardAPI.get(id);
            if (neoCard) {
                newCard = neoCard;
                cardCache.set(id, newCard);
            }
            else {
                return;
            }
        }
        card.value = newCard;
    }
    async function addRelation(
        type: string,
        parent_id: number,
        child_id: number
    ) {
        const newRelation = await RelationAPI.addRelation({ parent: parent_id, child: child_id, type: type });
    }

    return {
        card,
        fetchCard,
        card_relation,
        browseCard,
    }


});
