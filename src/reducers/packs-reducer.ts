import {getPacksResponseType, packsApi} from "../api/packs-api";
import {AppRootStateType, AppThunk} from "../store/store";
import {AxiosError} from "axios";
import {handleServerAppError} from "../utils/error-utils";

export enum SORT_PACKS {
  FROM_HIGHER_TO_LOWER = '0updated',
  FROM_LOWER_TO_HIGHER = '1updated',
}

const initialState = {
  cardPacks: [
    {
      _id: '',
      user_name: '',
      user_id: '',
      __v: 0,
      updated: '',
      type: '',
      shots: 0,
      rating: 0,
      private: false,
      path: '',
      name: '',
      more_id: '',
      grade: 0,
      deckCover: null,
      created: '',
      cardsCount: 0,
    },
  ],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  token: '',
  tokenDeathTime: 0,
  sortPacks: SORT_PACKS.FROM_HIGHER_TO_LOWER,
}

const SET_PACKS = 'SET_PACKS'
const CHANGE_PACKS_SORT = 'CHANGE_PACKS_SORT'

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "SET_PACKS_PAGE_COUNT":
      return {...state, pageCount: action.pageCount}
    case "SE_PACKS_CURRENT_PAGE":
      return {...state, page: action.page}
    case "SET_PACKS":
    case "CHANGE_PACKS_SORT":
      return {...state, ...action.payload}
    default:
      return state
  }
}

//actions
const setPacks = (packs: getPacksResponseType) => ({type: SET_PACKS, payload: {...packs}} as const)
export const changePacksSort = (sortPacks: SORT_PACKS) => ({type: CHANGE_PACKS_SORT, payload: {sortPacks}} as const)
export const setPageCount = (pageCount: number) => ({type: 'SET_PACKS_PAGE_COUNT', pageCount} as const)
export const setCurrentPage = (page: number) => ({type: 'SE_PACKS_CURRENT_PAGE', page} as const)

//thunks
export const fetchPacks = (): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      const page = getState().packs.page
      const pageCount = getState().packs.pageCount
      const sortPacks = getState().packs.sortPacks
      const response = await packsApi.getPacks(pageCount, page, sortPacks)
      dispatch(setPacks(response.data))
    } catch (e) {
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }
  export const showItemsPerPage = (pageCount:number): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
      try {
        const page = getState().packs.page
        const sortPacks = getState().packs.sortPacks
        const response = await packsApi.getPacks(pageCount, page, sortPacks)
        dispatch(setPacks(response.data))
      } catch (e) {
        const err = e as Error | AxiosError
        handleServerAppError(err, dispatch)
      }
    }
export const currentPage = (page:number): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      const pageCount = getState().packs.pageCount
      const sortPacks = getState().packs.sortPacks
      const response = await packsApi.getPacks(pageCount, page, sortPacks)
      dispatch(setPacks(response.data))
    } catch (e) {
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }

//types
type InitialStateType = typeof initialState

type ActionType =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof changePacksSort>
  | ReturnType<typeof setPageCount>
  | ReturnType<typeof setCurrentPage>