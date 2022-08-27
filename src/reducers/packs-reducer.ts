import {Dispatch} from "redux";
import {getPacksResponseType, packsApi, packType} from "../api/packs-api";

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
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0,
}

const SET_PACKS = 'SET_PACKS'

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PACKS":
            const newState = {...state, ...action.packs}
            return newState
        default:
            return state
    }
}

//actions
const setPacks = (packs: getPacksResponseType) => ({type: SET_PACKS, packs} as const)

//thunks
export const fetchPacks = () => async (dispatch: Dispatch) => {
    try {
        const response = await packsApi.getPacks()
        dispatch(setPacks(response.data))
    } catch (e) {}

}

//types
type InitialStateType = typeof initialState

type ActionType =
    |ReturnType<typeof setPacks>