import {instance} from "./instance";
import {SORT_CARDS} from "../reducers/cards-reducer";

export const cardsApi = {
    getCards: (params: CardsParamsType) => {
        return instance.get<GetCardsResponseType>('/cards/card?', {params})
    },
    addCard: (params: AddCardParamType) => {
        return instance.post<{ newCard: CardType }>('/cards/card', {card: params})
    },
    deleteCard: (id: string) => {
        return instance.delete<{ deletedCard: CardType }>(`/cards/card?id=${id}`)
    },
    editCard: (params: EditCardParamType) => {
        return instance.put<{ updatedCard: CardType }>('/cards/card', {card: params})
    },
    updateGrade: (params: UpdatedGradeDataType) => {
        return instance.put<UpdatedGradeResponseType>('/cards/grade', params)
    },

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

export type AddCardParamType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: 0
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type EditCardParamType = {
    _id: string
    question?: string
    comments?: string
    answer?:string
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

// update grade
export type UpdatedGradeDataType = {
    grade: number;
    card_id: string;
}

export type UpdatedGradeType = {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

export type UpdatedGradeResponseType = {
    updatedGrade: UpdatedGradeType;
    token: string;
    tokenDeathTime: number;
}