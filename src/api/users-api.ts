import {instance} from "./instance";

export const usersAPI =  {
  fetchUsers(){
    return instance.get('/social/users')
  }
}

//types

export type UsersResponseType={

}
export type RootObject = {
	users: RootObjectUsers[];
	page: number;
	pageCount: number;
	usersTotalCount: number;
	minPublicCardPacksCount: number;
	maxPublicCardPacksCount: number;
	token: string;
	tokenDeathTime: number;
}
export type RootObjectUsers = {
	_id: string;
	email: string;
	isAdmin: boolean;
	name: string;
	verified: boolean;
	publicCardPacksCount: number;
	created: string;
	updated: string;
}