import {
  AddCardParamType,
  cardsApi,
  CardsParamsType,
  EditCardParamType,
  GetCardsResponseType,
  UpdatedGradeDataType
} from "../api/cards-api";
import {AppRootStateType, AppThunk} from "../store/store";
import {setAppStatus} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";
import {AxiosError} from "axios";

export enum SORT_CARDS {
  FROM_HIGHER_TO_LOWER = '0grade',
  FROM_LOWER_TO_HIGHER = '1grade',
}

const initialState = {
  cards: [
    {
      _id: '',
      __v: 0,
      answer: '',
      answerImg: '',
      answerVideo: '',
      cardsPack_id: '',
      comments: '',
      created: '',
      grade: 0,
      more_id: '',
      question: '',
      questionImg: '',
      questionVideo: '',
      rating: 0,
      shots: 0,
      type: '',
      updated: '',
      user_id: '',
    },
  ],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  packCreated: '',
  packDeckCover: null,
  packName: '',
  packPrivate: false,
  packUpdated: '',
  packUserId: '',
  page: 0,
  pageCount: 5,
  token: '',
  tokenDeathTime: 0,
  isDownFilter: false,
  sortCards: SORT_CARDS.FROM_HIGHER_TO_LOWER,
  filterCardQuestion: '',
  currentCardId: '',
  currentCardQuestion: '',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionType): InitialStateType => {
  switch (action.type) {
    case "SET_CURRENT_CARD_ID":
    case "SET_CARDS":
    case "CHANGE_CARDS_SORT":
    case 'CHANGE_FILTER_CARD_QUESTION':
      return {...state, ...action.payload}
    default:
      return state
  }
}

//actions
const setCards = (cards: GetCardsResponseType) =>
  ({type: 'SET_CARDS', payload: {...cards}} as const)
export const changeCardsSort = (sortCards: SORT_CARDS) =>
  ({type: 'CHANGE_CARDS_SORT', payload: {sortCards}} as const)
export const changeFilterCardQuestion = (filterCardQuestion: string) =>
  ({type: 'CHANGE_FILTER_CARD_QUESTION', payload: {filterCardQuestion}})
export const setCurrentCardQuestionAndId = (currentCardId: string, currentCardQuestion: string) =>
  ({type: 'SET_CURRENT_CARD_ID', payload: {currentCardId, currentCardQuestion}})

//thunks
export const fetchCards = (packId: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      dispatch(setAppStatus('loading'))
      const params: CardsParamsType = {
        cardsPack_id: packId,
        sortCards: getState().cards.sortCards,
        cardQuestion: getState().cards.filterCardQuestion,
        pageCount: getState().cards.pageCount,
        page: getState().cards.page
      }
      const response = await cardsApi.getCards(params)
      dispatch(setCards(response.data))
      dispatch(setAppStatus('succeed'))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      handleServerAppError(e as Error | AxiosError, dispatch)
    }
  }

export const showCardsPerPage = (pageCount: number, packId: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      dispatch(setAppStatus('loading'))
      const params: CardsParamsType = {
        cardsPack_id: packId,
        pageCount: pageCount,
        page: getState().cards.page
      }
      const response = await cardsApi.getCards(params)
      dispatch(setCards(response.data))
      dispatch(setAppStatus('succeed'))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }
export const currentCardsPage = (page: number, packId: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      dispatch(setAppStatus('loading'))
      const params: CardsParamsType = {
        cardsPack_id: packId,
        pageCount: getState().cards.pageCount,
        page: page
      }
      const response = await cardsApi.getCards(params)
      dispatch(setCards(response.data))
      dispatch(setAppStatus('succeed'))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }
export const createCard = (packId: string, question: string, answer: string): AppThunk =>
  async (dispatch) => {
    try {
      const params: AddCardParamType = {
        cardsPack_id: packId,
        question: question,
        answer: answer
      }
      await cardsApi.addCard(params)
      dispatch(fetchCards(packId))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }
export const removeCard = (cardsPack_id: string, id: string): AppThunk =>
  async (dispatch) => {
    try {
      await cardsApi.deleteCard(id)
      dispatch(fetchCards(cardsPack_id))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }
export const updateCard = (cardsPack_id: string, question: string, answer: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      const params: EditCardParamType = {
        _id: getState().cards.currentCardId,
        question: question,
        answer: answer
      }
      await cardsApi.editCard(params)
      dispatch(fetchCards(cardsPack_id))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }

export const updateGrade = (params: UpdatedGradeDataType, packId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatus('loading'))

      await cardsApi.updateGrade(params)
      dispatch(fetchCards(packId))
      dispatch(setAppStatus('succeed'))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }

//types
type InitialStateType = typeof initialState

export type CardsActionType =
  | ReturnType<typeof setCards>
  | ReturnType<typeof changeCardsSort>
  | ReturnType<typeof changeFilterCardQuestion>
  | ReturnType<typeof setCurrentCardQuestionAndId>