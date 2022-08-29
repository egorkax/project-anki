import {instance} from "./instance";
import {SORT_PACKS} from "../reducers/packs-reducer";

export const packsApi = {
    getPacks: (pageCount: number = 10,
               page: number = 1,
               sortPacks: SORT_PACKS = SORT_PACKS.FROM_HIGHER_TO_LOWER,
               minCardsCount: number = 0,
               maxCardsCount: number = 10,
    ) => {
        return instance
            .get<getPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&sortPacks=${sortPacks}&min=${minCardsCount}&max=${maxCardsCount}`)
    }
}

//types
export type packType = {
    _id: string
    user_name: string
    user_id: string
    __v: number
    updated: string
    type: string
    shots: number
    rating: number
    private: boolean
    path: string
    name: string
    more_id: string
    grade: number
    deckCover: null
    created: string
    cardsCount: number
}

export type getPacksResponseType = {
    cardPacks: packType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}