import axios, {AxiosError} from "axios";
import {AuthActionType} from "../reducers/auth-reducer";
import {Dispatch} from "redux";
import {AppActionsType, setAppError} from "../reducers/app-reducer";
import {ProfileActionsType} from "../reducers/profile-reducer";

export const handleServerAppError = (err: Error | AxiosError, dispatch: ErrorUtilsDispatchType) => {
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
    dispatch(setAppError(error))
  } else {
    dispatch(setAppError(`Native error ${err.message}`))
  }
}


type ErrorUtilsDispatchType = Dispatch<AppActionsType | AuthActionType | ProfileActionsType>
