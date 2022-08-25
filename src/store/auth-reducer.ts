import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";
import {deleteUserData, setUserData, setUserDataType} from "../features/Profile/profile-reducer";


enum AUTH_TYPES {
    CHANGE_IS_AUTH = 'project_anki/auth/CHANGE_IS_AUTH',
    SET_AUTH_ERROR = 'project_anki/auth/SET_AUTH_ERROR',
    IS_SENT_DATA = 'project_anki/auth/IS_SENT_DATA',
    SET_RECOVERY_EMAIL = 'project_anki/auth/SET_RECOVERY_EMAIL',
    SET_STATUS = 'project_anki/auth/SET_STATUS',
}

const initialState: initialStateType = {
    isSentData: false,
    isAuth: false,
    error: '',
    recoveryEmail: '',
    status: 'idle',
}

export const authReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case AUTH_TYPES.IS_SENT_DATA:
            return {...state, isSentData: action.isSentData}
        case AUTH_TYPES.CHANGE_IS_AUTH:
            return {...state, isAuth: action.isAuth}
        case AUTH_TYPES.SET_AUTH_ERROR:
            return {...state, error: action.error}
        case AUTH_TYPES.SET_RECOVERY_EMAIL:
            return {...state, recoveryEmail: action.email}
        case AUTH_TYPES.SET_STATUS:
            return {...state, status: action.status}
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
export const setRecoveryEmail = (email: string) =>
    ({type: AUTH_TYPES.SET_RECOVERY_EMAIL, email} as const)
export const setStatus = (status: requestTypes) =>
    ({type: AUTH_TYPES.SET_STATUS, status} as const)

//thunks
export const recoveryPass = (email: string) => async function (dispatch: Dispatch) {
    try {
        dispatch(setRecoveryEmail(email))
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
export const updatePass = (password: string, token: string | undefined) => async function (dispatch: Dispatch) {
    try {
        let payload = {password: password, resetPasswordToken: token}
        let response = await authAPI.newPass(payload)
        if (response.data.info === "setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—") {
            dispatch(setRecoveryStatus(true))
        }
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
export const signUp = (signUpData: signUpDataType) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await authAPI.signUp(signUpData)
        dispatch(changeIsAuth(true))
        dispatch(setUserData(response.data))
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
export const signIn = (email: string,
                       password: string,
                       rememberMe: boolean) => async function (dispatch: any) {

    try {
        dispatch(setStatus('loading'))
        const payload = {email, password, rememberMe}
        const response = await authAPI.signIn(payload)
        dispatch(changeIsAuth(true))
        dispatch(setUserData(response.data))
        dispatch(setStatus('succeed'))
    } catch (e) {
        dispatch(setStatus('failed'))
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAuthError(error))
        } else {
            dispatch(setAuthError(`Native error ${err.message}`))
        }
    }
}
export const signOut = () => async function (dispatch: Dispatch) {
    try {
        dispatch(setStatus('loading'))
        await authAPI.signOut()
        dispatch(changeIsAuth(false))
        dispatch(deleteUserData())
        dispatch(setStatus('succeed'))
    } catch (e) {
        dispatch(setStatus('failed'))
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
    isSentData: boolean
    isAuth: boolean
    error: string
    recoveryEmail: string
    status: requestTypes
}

type requestTypes = 'idle' | 'loading' | 'succeed' | 'failed'

export type changeIsAuthType = ReturnType<typeof changeIsAuth>

type actionType =
    | ReturnType<typeof setRecoveryStatus>
    | changeIsAuthType
    | setUserDataType
    | ReturnType<typeof setAuthError>
    | ReturnType<typeof setRecoveryEmail>
    | ReturnType<typeof setStatus>

export type signUpDataType = {
    email: string
    password: string
}



