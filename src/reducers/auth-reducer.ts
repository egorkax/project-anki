import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";
import {deleteUserData, setUserData, SetUserDataType} from "./profile-reducer";
import {AppRootStateType, AppThunk, DispatchType} from "../store/store";
import {handleServerAppError} from "../utils/error-utils";

const initialState = {
  isSentData: false,
  isAuth: false,
  error: '',
  recoveryEmail: '',
  status: 'idle' as StatusTypes,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
  switch (action.type) {
    case 'IS_SENT_DATA':
      return {...state, isSentData: action.isSentData}
    case 'CHANGE_IS_AUTH':
      return {...state, isAuth: action.isAuth}
    case 'SET_AUTH_ERROR':
      return {...state, error: action.error}
    case 'SET_RECOVERY_EMAIL':
      return {...state, recoveryEmail: action.email}
    case 'SET_STATUS':
      return {...state, status: action.status}
    default:
      return state
  }
}

//actions
export const setRecoveryStatus = (isSentData: boolean) =>
  ({type: 'IS_SENT_DATA', isSentData} as const)

export const changeIsAuth = (isAuth: boolean) =>
  ({type: 'CHANGE_IS_AUTH', isAuth} as const)

export const setAuthError = (error: string) =>
  ({type: 'SET_AUTH_ERROR', error} as const)

export const setRecoveryEmail = (email: string) =>
  ({type: 'SET_RECOVERY_EMAIL', email} as const)

export const setStatus = (status: StatusTypes) =>
  ({type: 'SET_STATUS', status} as const)

//thunks
export const recoveryPassword = (email: string) => async function (dispatch: Dispatch) {
  try {
    dispatch(setRecoveryEmail(email))
    const payload = {
      email: email,
      from: 'test-front-admin <angor78@gmail.com>',
      message: `<div style="background-color: whitesmoke;text-align: center ">
                  <h2>Password recovery</h2><div>
                     Please use the following link to reset your password: 
                  <a href='http://localhost:3000/#/new-password/$token$'>
                     Password recovery
                  </a>      
                  <br/>
                     If you didn't make this request, then you can ignore this email 🙂
                  <br/>
                 </div>
                </div>`
    }
    await authAPI.recovery(payload)
    dispatch(setRecoveryStatus(true))
  } catch (e) {
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}

export const updatePassword = (password: string, token: string | undefined) => async function (dispatch: Dispatch) {
  try {
    let payload = {password: password, resetPasswordToken: token}
    await authAPI.newPass(payload)
    dispatch(setRecoveryStatus(true))
  } catch (e) {
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}

export const signUp = (signUpData: SignUpDataType) => async (dispatch: Dispatch<AuthActionType>) => {
  try {
    const response = await authAPI.signUp(signUpData)
    dispatch(changeIsAuth(true))
    dispatch(setUserData(response.data))
  } catch (e) {
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}

export const signIn = (email: string, password: string, rememberMe: boolean) => async function (dispatch: any) {
  try {
    dispatch(setStatus('loading'))
    const payload = {email, password, rememberMe}
    const response = await authAPI.signIn(payload)
    dispatch(changeIsAuth(true))
    dispatch(setUserData(response.data))
    dispatch(setStatus('succeed'))
  } catch (e) {
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}

export const signOut = (): AppThunk => async (dispatch: DispatchType, getState: () => AppRootStateType) => {
  try {
    dispatch(setStatus('loading'))
    await authAPI.signOut()
    dispatch(setAuthError(''))
    dispatch(changeIsAuth(false))
    dispatch(deleteUserData())
    dispatch(setStatus('succeed'))
  } catch (e) {
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}


//types
type InitialStateType = typeof initialState

export type StatusTypes = 'idle' | 'loading' | 'succeed' | 'failed'

export type ChangeIsAuthType = ReturnType<typeof changeIsAuth>

export type AuthActionType =
  | ReturnType<typeof setRecoveryStatus>
  | ChangeIsAuthType
  | SetUserDataType
  | ReturnType<typeof setAuthError>
  | ReturnType<typeof setRecoveryEmail>
  | ReturnType<typeof setStatus>

export type SignUpDataType = {
  email: string
  password: string
}



