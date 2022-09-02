import { instance } from "./instance";
import {UserType} from "../reducers/profile-reducer";

export const profileAPI = {
    changeUserName(data: ChangeUserNameType) {
        return instance.put<ChangeUserResponseType>('auth/me', data);
    },
}

//types
export type ChangeUserNameType = {
    name: string
    avatar: string
}

type ChangeUserResponseType = {
    updatedUser: UserType
    error?: string
}