import {AnyAction} from "redux";
import {getPacksResponseType, packsApi} from "../api/packs-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType, AppThunk} from "../store/store";
import {handleServerAppError} from "../utils/error-utils";
import {AxiosError} from "axios";

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
    maxCardsCount: 10,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    sortPacks: SORT_PACKS.FROM_HIGHER_TO_LOWER,
}

const SET_PACKS = 'SET_PACKS'
const CHANGE_PACKS_SORT = 'CHANGE_PACKS_SORT'
const CHANGE_MIN_MAX_CARDS_COUNT = 'CHANGE_MIN_MAX_CARDS_COUNT'

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PACKS":
        case "CHANGE_PACKS_SORT":
        case "CHANGE_MIN_MAX_CARDS_COUNT":
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actions
const setPacks = (packs: getPacksResponseType) =>
    ({type: SET_PACKS, payload: {...packs}} as const)
export const changePacksSort = (sortPacks: SORT_PACKS) =>
    ({type: CHANGE_PACKS_SORT, payload: {sortPacks}} as const)
export const changeMinMaxCardsCount = (minMaxCardsCount: { min: number, max: number }) =>
    ({type: CHANGE_MIN_MAX_CARDS_COUNT, payload: {...minMaxCardsCount}})

//thunks
export const fetchPacks = (): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            const page = getState().packs.page
            const pageCount = getState().packs.pageCount
            const sortPacks = getState().packs.sortPacks
            const minCardsCount = getState().packs.minCardsCount
            const maxCardsCount = getState().packs.maxCardsCount
            const response = await packsApi.getPacks(pageCount, page, sortPacks, minCardsCount, maxCardsCount)
            dispatch(setPacks(response.data))
        } catch (e) {
            handleServerAppError(e as Error | AxiosError, dispatch)
        }
    }

export const changeNumberOfCards = (): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    try {
        
    } catch (e) {
        handleServerAppError(e as Error | AxiosError, dispatch)
    }
}

//types
type InitialStateType = typeof initialState

export type PacksActionType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof changePacksSort>
    | ReturnType<typeof changeMinMaxCardsCount>
