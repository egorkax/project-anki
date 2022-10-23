import {AppThunk} from "../store/store";
import {usersAPI, UsersResponseType} from "../api/users-api";
import {setAppStatus} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError} from "../utils/error-utils";

const initialState = {
  users: [
    {
      _id: '',
      email: '',
      isAdmin: false,
      name: '',
      verified: false,
      publicCardPacksCount: 0,
      created: '',
      updated: '',
      avatar: '+',
    }
  ],
  page: 1,
  pageCount: 5,
  usersTotalCount: 5,
  minPublicCardPacksCount: 0,
  maxPublicCardPacksCount: 0,
  token: '',
  tokenDeathTime: 0
}

export const usersReducer = (state: InitialStateType = initialState, action: UsersActionType): InitialStateType => {
  switch (action.type) {
    case 'SET-USERS':
      return <InitialStateType>{...state, ...action.payload}
    default:
      return state
  }
}

//actions
const setUsers = (users: UsersResponseType) => {
  return {type: 'SET-USERS', payload: {...users}} as const
}

//thunks
export const fetchUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    const params = {
      page: getState().users.page,
      pageCount: getState().users.pageCount
      // pageCount: getState().users.pageCount,
      // usersTotalCount: getState().users.usersTotalCount,
      // minPublicCardPacksCount: getState().users.minPublicCardPacksCount,
      // maxPublicCardPacksCount: getState().users.maxPublicCardPacksCount,
    }
    const res: any = await usersAPI.getUsers(params)
    dispatch(setUsers(res.data))
    // dispatch(setAppStatus('succeed'))
  } catch (e) {
    dispatch(setAppStatus('failed'))
    const err = e as Error | AxiosError
    handleServerAppError(err, dispatch)
  }
}
export const showUsersPerPage = (pageCount: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatus('loading'))
      const params = {
        pageCount: pageCount,
      }
      const response = await usersAPI.getUsers(params)
      dispatch(setUsers(response.data))
      dispatch(setAppStatus('succeed'))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      handleServerAppError(e as Error | AxiosError, dispatch)
    }
  }
export const currentUserPage = (page: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatus('loading'))
      const params = {
        page: page,
        pageCount: getState().users.pageCount,

      }
      const response = await usersAPI.getUsers(params)
      dispatch(setUsers(response.data))
      dispatch(setAppStatus('succeed'))
    } catch (e) {
      dispatch(setAppStatus('failed'))
      const err = e as Error | AxiosError
      handleServerAppError(err, dispatch)
    }
  }


//types
type InitialStateType = typeof initialState

export type UsersActionType =
  | ReturnType<typeof setUsers>
