import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV==='development'?'http://localhost:7542/2.0/':'https://neko-back.herokuapp.com/2.0',
  withCredentials: true
})


export type SignInParamsType = {
  email: string
  password: string
  rememberMe: boolean
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
export const SignInAPI = {
  authMe() {
    return instance.post<ResponseSignInType>(`auth/me`, {})
  },
  signIn(payload: SignInParamsType) {
    return instance.post<ResponseSignInType>(`auth/login`, payload)
  },
}
