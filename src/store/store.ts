import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {profileReducer} from "../features/Profile/profile-reducer";
import {signupReducer} from "./signup-reducer";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,


    signUp: signupReducer,
    app: appReducer,
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;

