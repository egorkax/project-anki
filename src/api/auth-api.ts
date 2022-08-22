import { signUpDataType } from "../store/auth-reducer";
import {instance} from "./instance";

export const authAPI = {
    signUp: (signUpData: signUpDataType) => {
        return instance.post('auth/register', signUpData)
    }
}

//types
type signUpResponseType = {
    addedUser: {}
    error?: string
}