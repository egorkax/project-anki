import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {profileReducer} from "../features/Profile/profile-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,


})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;

