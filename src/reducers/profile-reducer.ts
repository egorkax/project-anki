import {profileAPI} from "../api/profile-api";
import {AxiosError} from "axios";
import {AppRootStateType, AppThunk, DispatchType} from "../store/store";
import {setStatus} from "./auth-reducer";
import {handleServerAppError} from "../utils/error-utils";
import {setAppStatus} from "./app-reducer";

const initialState: UserType = {
  _id: '',
  email: '',
  rememberMe: false,
  isAdmin: false,
  name: '',
  verified: false,
  publicCardPacksCount: 0,
  created: '',
  updated: '',
  __v: 0,
  token: '',
  tokenDeathTime: 0,
  avatar: '',
};

export const profileReducer = (state = initialState, action: ProfileActionsType):UserType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {...state, ...action.userData}
    case 'SET_USER_NAME':
      return {...state, name: action.name}
    case 'DELETE_USER_DATA':
      return {...initialState}
    default:
      return state
  }
}

// actions
export const setNewUserName = (name: string) => ({type: 'SET_USER_NAME', name} as const)
export const setUserData = (userData: UserType) => ({type: 'SET_USER_DATA', userData} as const)
export const deleteUserData = () => ({type: 'DELETE_USER_DATA'} as const)

//thunks
export const changeUserName = (name: string): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
  try {
    dispatch(setAppStatus('loading'))
    await profileAPI.changeUserName({name, avatar: ''})
    dispatch(setNewUserName(name))
    dispatch(setAppStatus('succeed'))
  } catch (e) {
    dispatch(setAppStatus('failed'))
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
}
//types
export type SetUserDataType = ReturnType<typeof setUserData>

export type ProfileActionsType =
  | ReturnType<typeof setNewUserName>
  | ReturnType<typeof deleteUserData>
  | SetUserDataType

export type UserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar?: string;
}