import {Dispatch} from "redux";
import {profileAPI} from "../../api/profile-api";
import axios, {AxiosError} from "axios";

const initialState = {
    user: {
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
        avatar: null as string | null,
    },
};

export const profileReducer = (state: UserType = initialState.user, action: ActionsType) => {
    switch (action.type) {
        case "SET-USER-NAME":
            return {
                ...state, name: action.name
            }
        default:
            return state
    }
}

// actions

export const setNewUserNameAC = (name: string) => ({type: 'SET-USER-NAME', name
} as const)


export const LogOutProfileAC = (data:UserType) => ({type: 'LOG-OUT-PROFILE', data} as const)

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
export type setNewUserNameACType = ReturnType<typeof setNewUserNameAC>
export type LogOutProfileACACType = ReturnType<typeof LogOutProfileAC>
export type ActionsType = setNewUserNameACType | LogOutProfileACACType
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
    avatar: string | null;
};