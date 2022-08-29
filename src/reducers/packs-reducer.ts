import {AnyAction} from "redux";
import {getPacksResponseType, packsApi} from "../api/packs-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store/store";

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
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    sortPacks: SORT_PACKS.FROM_HIGHER_TO_LOWER,
}

const SET_PACKS = 'SET_PACKS'
const CHANGE_PACKS_SORT = 'CHANGE_PACKS_SORT'

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
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

//thunks
export const fetchPacks = (): ThunkAction<void, AppRootStateType, unknown, AnyAction> =>
    async (dispatch, getState: () => AppRootStateType) => {
    try {
        const page = getState().packs.page
        const pageCount = getState().packs.pageCount
        const sortPacks = getState().packs.sortPacks
        const response = await packsApi.getPacks(pageCount, page, sortPacks)
        dispatch(setPacks(response.data))
    } catch (e) {
    }
}

//types
type InitialStateType = typeof initialState

type ActionType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof changePacksSort>