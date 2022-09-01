import {instance} from "./instance";
import {SORT_PACKS} from "../reducers/packs-reducer";

export const packsApi = {
    getPacks: (params: GetPacksParamsType) => {
        return instance
            .get<GetPacksResponseType>('/cards/pack', {params})
    },
    changePack: (params: ChangePackParamsType) => {
        return instance
            .put<PackType>('/cards/pack', {cardsPack: params})
    },
    deletePack: (packId: string) => {
        return instance.delete<PackType>(`/cards/pack?id=${packId}`)
    }
}

//types

type ChangePackParamsType = {
    _id: string
    name?: string
    private?: boolean
}

type GetPacksParamsType = {
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