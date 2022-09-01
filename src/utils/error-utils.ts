import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {AllActionsType} from "../store/store";
import {setAppError, setAppStatus} from "../reducers/app-reducer";
import {setAuthError} from "../reducers/auth-reducer";

export const handleServerAppError = (err: Error | AxiosError, dispatch: ErrorUtilsDispatchType) => {
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
    dispatch(setAppError(error))
  } else {
    dispatch(setAppError(`Native error ${err.message}`))
  }
}

type ErrorUtilsDispatchType = Dispatch<AllActionsType>
