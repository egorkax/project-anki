import axios from 'axios'

const instance = axios.create({
  //на локальном бэке не работает
  // слать запрос на хероку
  baseURL:'https://neko-back.herokuapp.com/2.0/',
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
