import {instance, instanceForHeroku} from "./instance";
import {signUpDataType} from "../reducers/auth-reducer";

export const authAPI = {
    authMe: () => {
        return instance.post<ResponseSignInType>('/auth/me')
    },
    signUp: (signUpData: signUpDataType) => {
        return instance.post('auth/register', signUpData)
    },
    signIn(payload: SignInParamsType) {
        return instance.post<ResponseSignInType>(`auth/login`, payload)
    },
    signOut() {
        return instance.delete<ResponseSignInType>(`auth/me`, {})
    },
    newPass(payload: NewPassParamsType) {
        return instance.post<ResponseNewPassType>(`auth/set-new-password`, payload)
    },
    recovery(payload:RecoveryParamsType) {
        return instanceForHeroku.post<ResponseRecoveryType>(`auth/forgot`, payload)
    },
}

//types
type signUpResponseType = {
    addedUser: {}
    error?: string
}
export type ResponseNewPassType = {
    info: string
    error: string;
}
export type NewPassParamsType = {
    password: string
    resetPasswordToken: string | undefined
}
export type RecoveryParamsType = {
    email: string
    from: string
    message: string
}
export type ResponseRecoveryType = {
    info: string
    error: string;
}

export type ResponseSignInType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar?: string
}

export type SignInParamsType = {
    email: string
    password: string
    rememberMe: boolean
}