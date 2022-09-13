import axios, {AxiosError} from "axios";
import {authAPI} from "../api/auth-api";
import {changeIsAuth, StatusTypes} from "./auth-reducer";
import {setUserData} from "./profile-reducer";
import {AppThunk} from "../store/store";

const initialState = {
  isInitialized: false,
  appStatus: 'idle' as StatusTypes,
  appError: '',
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZE_APP':
      return {...state, isInitialized: true}
    case "SET_APP_STATUS":
    case "SET_APP_ERROR":
      return {...state, ...action.payload}
    default:
      return state
  }
}

//actions
const setIsInitialized = () => ({type: "INITIALIZE_APP"} as const)
export const setAppError = (appError: string) => ({type: "SET_APP_ERROR", payload: {appError}} as const)
export const setAppStatus = (appStatus: StatusTypes) => ({type: "SET_APP_STATUS", payload: {appStatus}} as const)

//thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
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
export type AppActionsType =
  | ReturnType<typeof setIsInitialized>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppStatus>

type InitialStateType = typeof initialState