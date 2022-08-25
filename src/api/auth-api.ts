import {instance} from "./instance";
import {signUpDataType} from "../store/auth-reducer";

export const authAPI = {
    authMe: () => {
        return instance.post('/auth/me')
    },
    signUp: (signUpData: signUpDataType) => {
        return instance.post('auth/register', signUpData)
    },
    newPass(payload: NewPassParamsType) {
        return instance.post<ResponseNewPassType>(`auth/set-new-password`, payload)
    },
    recovery(payload:RecoveryParamsType) {
        return instance.post<ResponseRecoveryType>(`auth/forgot`, payload)
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