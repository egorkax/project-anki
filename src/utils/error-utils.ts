import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAuthError } from "../reducers/auth-reducer";
import {AllActionsType} from "../store/store";

export const handleServerAppError = (err: Error | AxiosError, dispatch: ErrorUtilsDispatchType) => {
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
    dispatch(setAuthError(error))
  } else {
    dispatch(setAuthError(`Native error ${err.message}`))
  }
}

type ErrorUtilsDispatchType = Dispatch<AllActionsType>
