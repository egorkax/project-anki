import { instance } from "./instance";

export const profileAPI = {
    changeUserName(data: ChangeUserNameType) {
        return instance.put('auth/me', data);
    },
}


export type ChangeUserNameType = {
    name: string
    avatar: string
}