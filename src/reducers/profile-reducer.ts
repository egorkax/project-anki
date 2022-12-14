import {profileAPI} from "../api/profile-api";
import {AxiosError} from "axios";
import {AppThunk} from "../store/store";
import {setStatus} from "./auth-reducer";
import {handleServerAppError} from "../utils/error-utils";


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

export const profileReducer = (state = initialState, action: ProfileActionsType): UserType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {...state, ...action.userData}
    case 'SET_USER_NAME':
      return {...state, name: action.name}
    case 'SET_AVATAR':
      return {...state, avatar: action.avatar}
    case 'DELETE_USER_DATA':
      return {...initialState}
    default:
      return state
  }
}

// actions
export const setNewUserNameAC = (name: string) => ({type: 'SET_USER_NAME', name} as const)
export const setNewAvatarAC = (avatar: string) => ({type: 'SET_AVATAR', avatar} as const)
export const setUserData = (userData: UserType) => ({type: 'SET_USER_DATA', userData} as const)
export const deleteUserData = () => ({type: 'DELETE_USER_DATA'} as const)

//thunks
export const changeUserNameTC = (name: string): AppThunk => async (dispatch, getState) => {
  try {
    const avatar = getState().profile.avatar
    await profileAPI.changeUserName({name, avatar})
    dispatch(setNewUserNameAC(name))
  } catch (e) {
    dispatch(setStatus('failed'))
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}
export const uploadAvatar = (avatar: string): AppThunk => async (dispatch, getState) => {
  try {
    const name = getState().profile.name
    const response = await profileAPI.changeAvatar({name, avatar})
    dispatch(setUserData(response.data.updatedUser))
  } catch (e) {
    dispatch(setStatus('failed'))
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}
//types
export type setUserDataType = ReturnType<typeof setUserData>

export type ProfileActionsType =
  | ReturnType<typeof setNewUserNameAC>
  | ReturnType<typeof deleteUserData>
  | ReturnType<typeof setUserData>
  | ReturnType<typeof setNewAvatarAC>


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
  avatar: string;
}