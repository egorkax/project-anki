import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ProfileActionsType, profileReducer} from "../reducers/profile-reducer";
import {AppActionsType, appReducer} from "../reducers/app-reducer";
import {AuthActionType, authReducer} from "../reducers/auth-reducer";
import {CardsActionType, cardsReducer} from "../reducers/cards-reducer";
import {PacksActionType, packsReducer} from "../reducers/packs-reducer";
import {usersReducer} from "../reducers/users-reducer";


const rootReducer = combineReducers({
  profile: profileReducer,
  app: appReducer,
  auth: authReducer,
  cards: cardsReducer,
  packs: packsReducer,
  users: usersReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = AppActionsType | AuthActionType | ProfileActionsType | CardsActionType | PacksActionType
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
//hooks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>
//hooks
export const useAppDispatch = () => useDispatch<DispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;

