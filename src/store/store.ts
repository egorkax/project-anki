import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {profileReducer} from "../reducers/profile-reducer";
import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {packsReducer} from "../reducers/packs-reducer";
import {cardsReducer} from "../reducers/cards-reducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;

