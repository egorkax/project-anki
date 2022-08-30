import {instance} from "./instance";
import {SORT_CARDS} from "../reducers/cards-reducer";

export const cardsApi = {
    getCards: (params: CardsParamsType) => {
        return instance.get('/cards/card?', {params})
    }
}

//types
export type CardsParamsType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: SORT_CARDS
    page?: number
    pageCount?: number
}

export type CardType = {
    _id: string
    __v: number
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
}

export type GetCardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packCreated: string
    packDeckCover: null
    packName: string
    packPrivate: boolean
    packUpdated: string
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}