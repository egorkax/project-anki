import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV==='development'?'http://localhost:7542/2.0/':'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true
})


export type RecoveryParamsType = {
  email: string
  from: string
  message: string
}

export type ResponseRecoveryType = {
  info: string
  error: string;
}
export const RecoveryPassAPI = {
  recovery(payload:RecoveryParamsType) {
    return instance.post<ResponseRecoveryType>(`auth/forgot`, payload)
  },
}
