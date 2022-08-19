import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";

enum AUTH_TYPES {
    CHANGE_IS_AUTH = 'project_anki/auth/CHANGE_IS_AUTH',
}

const initialState: initialStateType = {
    isAuth: false,
}

export const authReducer = (state = initialState, action: actionType): initialStateType => {
    return state
}

//actions
const changeIsAuth = () => ({type: AUTH_TYPES.CHANGE_IS_AUTH} as const)

//thunks
export const signUp = (signUpData: signUpDataType) => async (dispatch: Dispatch) => {
    const response = await authAPI.signUp(signUpData)
    console.log(response)
}

//types
type initialStateType = {
    isAuth: boolean
}
type actionType = any

export type signUpDataType = {
    email: string
    password: string
}