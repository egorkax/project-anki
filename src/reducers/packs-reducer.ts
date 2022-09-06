import {GetPacksResponseType, packsApi} from "../api/packs-api";
import {AppRootStateType, AppThunk} from "../store/store";
import {handleServerAppError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setAppStatus} from "./app-reducer";
import {fetchCards} from "./cards-reducer";



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
    maxCardsCount: 110,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0,
    sortPacks: SORT_PACKS.FROM_HIGHER_TO_LOWER,
    filterMinCardsCount: 0,
    filterMaxCardsCount: 110,
    filterPackName: '',
    isMy: false,
    currentPackId: '',
    currentPackName: '',
}


export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PACKS":
        case "CHANGE_PACKS_SORT":
        case "CHANGE_MIN_MAX_CARDS_COUNT":
        case "FILTER_PACK_NAME":
        case "CHANGE_IS_MY":
        case 'SET_CURRENT_PACK_ID_NAME':
            return {...state, ...action.payload}
        case 'CLEAR_FILTERS':
            return {
                ...state,
                filterMinCardsCount: 0,
                filterMaxCardsCount: 0,
                filterPackName: '',
                isMy: false,
            }
        default:
            return state
    }
}

//actions
const setPacks = (packs: GetPacksResponseType) =>
    ({type: 'SET_PACKS', payload: {...packs}} as const)
export const changePacksSort = (sortPacks: SORT_PACKS) =>
    ({type: 'CHANGE_PACKS_SORT', payload: {sortPacks}} as const)
export const changeMinMaxCardsCount = (minMaxCardsCount: { filterMinCardsCount: number, filterMaxCardsCount: number }) =>
    ({type: 'CHANGE_MIN_MAX_CARDS_COUNT', payload: {...minMaxCardsCount}} as const)
export const changeFilterPackName = (filterPackName: string) =>
    ({type: 'FILTER_PACK_NAME', payload: {filterPackName}} as const)
export const changeIsMy = (isMy: boolean) =>
    ({type: 'CHANGE_IS_MY', payload: {isMy}} as const)
export const clearFilters = () =>
    ({type: 'CLEAR_FILTERS'} as const)
export const setCurrentPackIdName = (currentPackId: string, currentPackName: string) =>
    ({type: 'SET_CURRENT_PACK_ID_NAME', payload: {currentPackId, currentPackName}})

//thunks
export const fetchPacks = (): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatus('loading'))
            const isMy = getState().packs.isMy
            const params = {
                packName: getState().packs.filterPackName,
                min: getState().packs.filterMinCardsCount,
                max: getState().packs.filterMaxCardsCount,
                sortPacks: getState().packs.sortPacks,
                page: getState().packs.page,
                pageCount: getState().packs.pageCount,
                user_id: isMy ? getState().profile._id : '',
            }
            const response = await packsApi.getPacks(params)
            dispatch(setPacks(response.data))
            dispatch(setAppStatus('succeed'))
        } catch (e) {
            dispatch(setAppStatus('failed'))
            const err = e as Error | AxiosError
            handleServerAppError(err, dispatch)
        }
    }

export const showItemsPerPage = (pageCount: number): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatus('loading'))
            const isMy = getState().packs.isMy
            const params = {
                packName: getState().packs.filterPackName,
                min: getState().packs.filterMinCardsCount,
                max: getState().packs.filterMaxCardsCount,
                sortPacks: getState().packs.sortPacks,
                page: getState().packs.page,
                pageCount: pageCount,
                user_id: isMy ? getState().profile._id : '',
            }
            const response = await packsApi.getPacks(params)
            dispatch(setPacks(response.data))
            dispatch(setAppStatus('succeed'))
        } catch (e) {
            dispatch(setAppStatus('failed'))
            handleServerAppError(e as Error | AxiosError, dispatch)
        }
    }

export const deletePack = (): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            const packId = getState().packs.currentPackId
            dispatch(setAppStatus('loading'))
            await packsApi.deletePack(packId)
            dispatch(fetchPacks())
        } catch (e) {
            dispatch(setAppStatus('failed'))
            handleServerAppError(e as Error | AxiosError, dispatch)
        }
    }

export const addNewPack = (name: string, isPrivate: boolean): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await packsApi.addPack({name, private: isPrivate})
            dispatch(fetchPacks())
            dispatch(setAppStatus('succeed'))
        } catch (e) {
            dispatch(setAppStatus('failed'))
            handleServerAppError(e as Error | AxiosError, dispatch)
        }
    }

export const editPack = (name?: string, privacy?: boolean): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            const _id = getState().packs.currentPackId
            dispatch(setAppStatus('loading'))
            await packsApi.changePack({_id, name, private: privacy})
            await dispatch(fetchCards(_id))
            dispatch(fetchPacks())
            dispatch(setCurrentPackIdName('', ''))
        } catch (e) {
            dispatch(setAppStatus('failed'))
            handleServerAppError(e as Error | AxiosError, dispatch)
        }
    }

export const currentPage = (page: number): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setAppStatus('loading'))
            const isMy = getState().packs.isMy
            const params = {
                packName: getState().packs.filterPackName,
                min: getState().packs.filterMinCardsCount,
                max: getState().packs.filterMaxCardsCount,
                sortPacks: getState().packs.sortPacks,
                page: page,
                pageCount: getState().packs.pageCount,
                user_id: isMy ? getState().profile._id : '',
            }
            const response = await packsApi.getPacks(params)
            dispatch(setPacks(response.data))
            dispatch(setAppStatus('succeed'))
        } catch (e) {
            dispatch(setAppStatus('failed'))
            const err = e as Error | AxiosError
            handleServerAppError(err, dispatch)
        }
    }

//types
type InitialStateType = typeof initialState

export type PacksActionType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof changePacksSort>
    | ReturnType<typeof changeMinMaxCardsCount>
    | ReturnType<typeof changeFilterPackName>
    | ReturnType<typeof changeIsMy>
    | ReturnType<typeof clearFilters>
    | ReturnType<typeof setCurrentPackIdName>
