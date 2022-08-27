import {instance} from "./instance";
import exp from "constants";

export const cardsApi = {
    getCards: (packId: string) => {
        return instance.get(`/cards/card?cardsPack_id=${packId}`)
    }
}

//types
type cardType = {
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

export type getCardsResponseType = {
    cards: cardType[]
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