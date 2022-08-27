import {Dispatch} from "redux";
import {cardsApi, getCardsResponseType} from "../api/cards-api";

const SET_CARDS = 'SET_CARDS'

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
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_CARDS":
            return {...state, ...action.cards}
        default: return state
    }
}


//actions
const setCards = (cards: getCardsResponseType) => ({type: SET_CARDS, cards} as const)


//thunks
export const fetchCards = (packId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await cardsApi.getCards(packId)
        dispatch(setCards(response.data))
    } catch (e) {
        console.log(e)
    }
}

//types

type InitialStateType = typeof initialState

type ActionType =
    |ReturnType<typeof setCards>