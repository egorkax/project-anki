import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";
import {changeIsAuth, ChangeIsAuthType} from "./auth-reducer";
import {setUserData, SetUserDataType} from "./profile-reducer";

const initialState = {
  isInitialized: false
}

export const appReducer = (state: initialStateType = initialState, action: AppActionsType): initialStateType => {
  switch (action.type) {
    case 'INITIALIZE_APP':
      return {...state, isInitialized: true}
    default:
      return state
  }
}

//actions
const setIsInitialized = () => ({type: 'INITIALIZE_APP'})
const setAppError = (error: string) => ({type: 'SET_APP_ERROR', error} as const)

//thunks
export const initializeApp = () => async (dispatch: Dispatch<AppActionsType>) => {
  try {
    const response = await authAPI.authMe()
    dispatch(setIsInitialized())
    dispatch(changeIsAuth(true))
    dispatch(setUserData(response.data))
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
type AppActionsType =
  | ReturnType<typeof setIsInitialized>
  | ReturnType<typeof setAppError>
  | ChangeIsAuthType
  | SetUserDataType
type initialStateType = typeof initialState