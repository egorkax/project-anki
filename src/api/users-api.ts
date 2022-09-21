import {instance} from "./instance";

export const usersAPI = {
  getUsers(params: GetUsersParamsType) {
    return instance.get<UsersResponseType>('/social/users', {params})
  }
}

//types
type GetUsersParamsType = {
  userName?: string
  min?: number
  max?: number
  sortUsers?: number
  publicCardPacksCount?: number
  page?: number
  pageCount?: number

}
export type UsersResponseType = {
  users: UserType[];
  page: number;
  pageCount: number;
  usersTotalCount: number;
  minPublicCardPacksCount: number;
  maxPublicCardPacksCount: number;
  token: string;
  tokenDeathTime: number;
}
export type UserType = {
  _id: string;
  email: string;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
}