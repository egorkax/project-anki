import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const cardsAPI = {

    me() {
        return instance.post('auth/me', {})
    },
    changeUserName(data: ChangeUserNameType) {
        return instance.put('auth/me', data);
    },

    logOut() {
        return instance.delete('auth/me', {})
    }

}


export type ChangeUserNameType = {
    name: string
    avatar: string
}