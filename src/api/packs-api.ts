import {instance} from "./instance";
import {SORT_PACKS} from "../reducers/packs-reducer";

export const packsApi = {
    getPacks: (params: PacksParamsType) => {
        return instance
            .get<GetPacksResponseType>('/cards/pack', {params})
    }
  getPacks: (pageCount: number = 10, page: number = 1, sortPacks: SORT_PACKS = SORT_PACKS.FROM_HIGHER_TO_LOWER) => {
    return instance
      .get<getPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&sortPacks=${sortPacks}`)
  }
}

//types

type PacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: SORT_PACKS
    page?: number
    pageCount?: number
    user_id?: string
}

export type PackType = {
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

export type GetPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}