import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {SignInAPI} from "../api/signIn-api";


const SET_AUTH_USER = 'project_anki/auth/SET_AUTH_USER'


const initialState: initialStateType = {
  _id: '',
  email: '',
  name: '',
  isAuth: false
}

export const signInReducer = (state = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {...state, _id: action._id, email: action.email, name: action.name, isAuth: action.isAuth}
    default:
      return state
  }
}

//actions
const setAuthUserData = (_id: string, email: string, name: string, isAuth: boolean) => ({
  type: SET_AUTH_USER,
  _id, email, name, isAuth
} as const)

//thunks
export const authMe = () => async function (dispatch: Dispatch) {
  try {
    const response = await SignInAPI.authMe()
     dispatch(setAuthUserData(response.data._id,response.data.email,response.data.name, true))
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
    console.log(response)
    dispatch(authMe())
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
  _id: string
  email: string
  name: string
  isAuth: boolean
}

type actionType =
  | ReturnType<typeof setAuthUserData>


