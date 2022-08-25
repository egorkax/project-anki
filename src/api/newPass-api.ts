import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})


export type NewPassParamsType = {
  password: string
  resetPasswordToken: string | undefined
}

export type ResponseNewPassType = {
  info: string
  error: string;
}

export const NewPassAPI = {
  newPass(payload: NewPassParamsType) {
    return instance.post<ResponseNewPassType>(`auth/set-new-password`, payload)
  },
}
