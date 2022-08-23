import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import axios, {AxiosError} from "axios";

enum AUTH_TYPES {
    CHANGE_IS_AUTH = 'project_anki/auth/CHANGE_IS_AUTH',
    SET_AUTH_ERROR = 'project_anki/auth/SET_AUTH_ERROR',
}

const initialState: initialStateType = {
    isAuth: false,
    error: '',
}

export const signupReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case AUTH_TYPES.CHANGE_IS_AUTH:
            return {...state, isAuth: action.isAuth}
        default:
            return state
    }
}

//actions
export const changeIsAuth = (isAuth: boolean) => ({type: AUTH_TYPES.CHANGE_IS_AUTH, isAuth} as const)
const setAuthError = (error: string) => ({type: AUTH_TYPES.SET_AUTH_ERROR, error} as const)

//thunks
export const signUp = (signUpData: signUpDataType) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await authAPI.signUp(signUpData)
        dispatch(changeIsAuth(true))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAuthError(error))
        } else {
            dispatch(setAuthError(`Native error ${err.message}`))
        }
    }
}

//types
type initialStateType = {
    isAuth: boolean
    error: string
}

export type changeIsAuthType = ReturnType<typeof changeIsAuth>

export type actionType =
    | changeIsAuthType
    | ReturnType<typeof setAuthError>

export type signUpDataType = {
    email: string
    password: string
}