import {Dispatch} from "redux";
import {profileAPI} from "../api/profile-api";
import axios, {AxiosError} from "axios";

enum PROFILE_TYPES {
    SET_USER_DATA = 'project_anki/profile/SET_USER_DATA',
    SET_USER_NAME = 'project_anki/profile/SET_USER_NAME',
    DELETE_USER_DATA = 'project_anki/profile/DELETE_USER_DATA',
}

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

export const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case PROFILE_TYPES.SET_USER_DATA:
            return {...state, ...action.userData}
        case PROFILE_TYPES.SET_USER_NAME:
            return {
                ...state, name: action.name
            }
        case PROFILE_TYPES.DELETE_USER_DATA:
            return {...initialState}
        default:
            return state
    }
}

// actions
export const setNewUserNameAC = (name: string) => ({type: PROFILE_TYPES.SET_USER_NAME, name} as const)
export const setUserData = (userData: UserType) => ({type: PROFILE_TYPES.SET_USER_DATA, userData} as const)
export const deleteUserData = () => ({type: PROFILE_TYPES.DELETE_USER_DATA} as const)

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
export type setUserDataType = ReturnType<typeof setUserData>

export type ActionsType =
    | ReturnType<typeof setNewUserNameAC>
    | ReturnType<typeof deleteUserData>
    | setUserDataType

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