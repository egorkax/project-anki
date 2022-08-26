import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {profileReducer} from "../reducers/profile-reducer";
import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    app: appReducer,
    auth: authReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;

