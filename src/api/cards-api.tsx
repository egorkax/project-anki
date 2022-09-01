import {instance} from "./instance";
import {SORT_CARDS} from "../reducers/cards-reducer";

export const cardsApi = {
  getCards: (params: CardsParamsType) => {
    return instance.get('/cards/card?', {params})
  },
  addPack: (params: addPackParamType) => {
    return instance.post('/cards/pack', {cardsPack: params})
  },
  addCard: (params: addCardParamType) => {
    return instance.post('/cards/card', {card: params})
  },
}

//types
type addPackParamType = {
  name?: string
  deckCover?: string
  private?: boolean
}

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

export type addCardParamType = {
    cardsPack_id: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: 0 // не обязателен
    answerImg?: string // не обязателен "url or base 64"
    questionImg?: string // не обязателен "url or base 64"
    questionVideo?: string // не обязателен "url or base 64"
    answerVideo?: string // не обязателен "url or base 64"
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