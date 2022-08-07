import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {generalReducer} from "./general-reducer";


const rootReducer = combineReducers({

    data:generalReducer

})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;
