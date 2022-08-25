import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";
import { changeIsAuth, changeIsAuthType } from "./auth-reducer";

enum APP_TYPES {
    INITIALIZE_APP = 'project_anki/app/INITIALIZE_APP',
    SET_APP_ERROR = 'project_anki/app/SET_APP_ERROR'
}

const initialState: initialStateType = {
    isInitialized: false
}

export const appReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case APP_TYPES.INITIALIZE_APP:
            return {...state, isInitialized: true}
        default:
            return state
    }
}

//actions
const setIsInitialized = () => ({type: APP_TYPES.INITIALIZE_APP})
const setAppError = (error: string) => ({type: APP_TYPES.SET_APP_ERROR, error} as const)

//thunks
export const initializeApp = () => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await authAPI.authMe()
        dispatch(changeIsAuth(true))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                dispatch(setIsInitialized())
            } else {
                const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
                dispatch(setAppError(error))
            }
        } else {
            dispatch(setAppError(`Native error ${err.message}`))
        }
    }
}

//types
type actionType =
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setAppError>
    | changeIsAuthType
type initialStateType = {
    isInitialized: boolean
}