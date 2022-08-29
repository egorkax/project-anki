import {AnyAction, Dispatch} from "redux";
import {cardsApi, getCardsResponseType} from "../api/cards-api";
import {AppRootStateType} from "../store/store";
import {ThunkAction} from "redux-thunk";

export enum SORT_CARDS {
    FROM_HIGHER_TO_LOWER = '0grade',
    FROM_LOWER_TO_HIGHER = '1grade',
}

const SET_CARDS = 'SET_CARDS'
const CHANGE_CARDS_SORT = 'CHANGE_CARDS_SORT'

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
    pageCount: 0,
    token: '',
    tokenDeathTime: 0,
    isDownFilter: false,
    sortCards: SORT_CARDS.FROM_HIGHER_TO_LOWER
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_CARDS":
        case "CHANGE_CARDS_SORT":
            return {...state, ...action.payload}
        default:
            return state
    }
}


//actions
const setCards = (cards: getCardsResponseType) => ({type: SET_CARDS, payload: {...cards}} as const)
export const changeCardsSort = (sortCards: SORT_CARDS) => ({type: CHANGE_CARDS_SORT, payload: {sortCards}} as const)


//thunks
export const fetchCards = (packId: string): ThunkAction<void, AppRootStateType, unknown, AnyAction> =>
    async (dispatch, getState: () => AppRootStateType) => {
    try {
        const sortCards = getState().cards.sortCards
        const response = await cardsApi.getCards(packId, sortCards)
        dispatch(setCards(response.data))
    } catch (e) {
        console.log(e)
    }
}

//types

type InitialStateType = typeof initialState

type ActionType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof changeCardsSort>