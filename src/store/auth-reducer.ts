import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";
import {SignInAPI} from "../api/signIn-api";


enum AUTH_TYPES {
    CHANGE_IS_AUTH = 'project_anki/auth/CHANGE_IS_AUTH',
    SET_AUTH_ERROR = 'project_anki/auth/SET_AUTH_ERROR',
    IS_SENT_DATA = 'project_anki/password-recovery/IS_SENT_DATA',
    SET_AUTH_USER = 'project_anki/signIn/SET_AUTH_USER',
}

const initialState: initialStateType = {
    isSentData: false,
    _id: '',
    email: '',
    name: '',
    avatar: '',
    isAuth: false,
    error: '',
}

export const authReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case AUTH_TYPES.IS_SENT_DATA:
            return {...state, isSentData: action.isSentData}
        case AUTH_TYPES.SET_AUTH_USER:
            return {...state, _id: action._id, email: action.email, name: action.name, isAuth: action.isAuth}
        case AUTH_TYPES.CHANGE_IS_AUTH:
            return {...state, isAuth: action.isAuth}
        case AUTH_TYPES.SET_AUTH_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}


//actions
export const setRecoveryStatus = (isSentData: boolean) =>
    ({type: AUTH_TYPES.IS_SENT_DATA, isSentData} as const)
export const changeIsAuth = (isAuth: boolean) =>
    ({type: AUTH_TYPES.CHANGE_IS_AUTH, isAuth} as const)
const setAuthError = (error: string) =>
    ({type: AUTH_TYPES.SET_AUTH_ERROR, error} as const)
const setAuthUserData = (_id: string, email: string, name: string, isAuth: boolean, avatar?: string) =>
    ({type: AUTH_TYPES.SET_AUTH_USER, _id, email, name, isAuth, avatar} as const)

//thunks
export const recoveryPass = (email: string) => async function (dispatch: Dispatch) {
    try {
        const payload = {
            email: email,
            from: 'test-front-admin <angor78@gmail.com>',
            message:
                `<div style="background-color: whitesmoke;text-align: center ">
        <h2>Password recovery</h2>
        <div>
          Please use the following link to reset your password: 
            <a href='http://localhost:3000/#/new-password/$token$'>
              Password recovery
            </a>      
          <br/>
          If you didn’t make this request, then you can ignore this email 🙂
          <br/>
        </div>
      </div>`
        }
        const response = await authAPI.recovery(payload)
        if (response.data.info === 'sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—') {
            dispatch(setRecoveryStatus(true))
        }
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            console.log(error)
        } else {
            console.log(err.message)
        }
    }
}
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
export const updatePass = (password: string, token: string | undefined) => async function (dispatch: Dispatch) {
    try {
        let payload = {password: password, resetPasswordToken: token}
        let response = await authAPI.newPass(payload)
        console.log(response)
        if (response.data.info === "setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—") {
            dispatch(setRecoveryStatus(true))
        }
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            console.log(error)
        } else {
            console.log(err.message)
        }
    }
}
export const authMe = () => async function (dispatch: Dispatch) {
    try {
        const response = await SignInAPI.authMe()
        dispatch(setAuthUserData(response.data._id, response.data.email, response.data.name, true))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            console.log(error)
        } else {
            console.log(err.message)
        }
    }
}
export const signIn = (email: string,
                       password: string,
                       rememberMe: boolean) => async function (dispatch: any) {

    try {
        const payload = {email, password, rememberMe}
        const response = await SignInAPI.signIn(payload)

        dispatch(setAuthUserData(response.data._id,
            response.data.email,
            response.data.name,
            true,
            response.data.avatar))
        console.log(response)
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            console.log(error)
        } else {
            console.log(err.message)
        }
    }
}
export const signOut = () => async function (dispatch: Dispatch) {
    try {
        await SignInAPI.signOut()
        dispatch(setAuthUserData('', '', '', false))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            console.log(error)
        } else {
            console.log(err.message)
        }
    }
}


//types
type initialStateType = {
    isSentData: boolean
    _id: string
    email: string
    name: string
    avatar?: string
    isAuth: boolean
    error: string
}

type actionType =
    | ReturnType<typeof setRecoveryStatus>
    | ReturnType<typeof setAuthUserData>
    | changeIsAuthType
    | ReturnType<typeof setAuthError>

export type signUpDataType = {
    email: string
    password: string
}
export type changeIsAuthType = ReturnType<typeof changeIsAuth>



