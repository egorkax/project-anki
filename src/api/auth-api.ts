import { signUpDataType } from "../store/auth-reducer";
import {instance} from "./instance";
import {Simulate} from "react-dom/test-utils";

export const authAPI = {
    signUp: (signUpData: signUpDataType) => {
        debugger
        return instance.post('auth/register', signUpData)
            .then(response => {
                debugger
                return response.data
            })
            .catch(error => {
                debugger
                return error
            })
    }
}

//types
type signUpResponseType = {
    addedUser: {}
    error?: string
}