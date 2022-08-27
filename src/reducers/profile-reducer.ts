import {Dispatch} from "redux";
import {profileAPI} from "../api/profile-api";
import axios, {AxiosError} from "axios";

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

export const profileReducer = (state = initialState, action: ProfileActionsType) => {
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
export const setNewUserNameAC = (name: string) => ({type: 'SET_USER_NAME', name} as const)
export const setUserData = (userData: UserType) => ({type: 'SET_USER_DATA', userData} as const)
export const deleteUserData = () => ({type: 'DELETE_USER_DATA'} as const)

//thunks
export const changeUserNameTC = (name: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.changeUserName({name, avatar: ''})
            .then((res) => {
                dispatch(setNewUserNameAC(name))
            })
            .catch(e => {
                const err = e as Error | AxiosError<{ error: string }>;
                if (axios.isAxiosError(err)) {
                    const error = err.response ? err.response.data.error : err.message;

                    // dispatch(setAppError({error}));
                } else {
                    // dispatch(setAppError({error: `Native error ${err.message}`}));
                }
            })
    }
}

//types
export type SetUserDataType = ReturnType<typeof setUserData>

export type ProfileActionsType =
    | ReturnType<typeof setNewUserNameAC>
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