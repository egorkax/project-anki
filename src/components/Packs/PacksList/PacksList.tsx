import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {PacksTable} from "./PacksTable";
import '../PacksBlock.css'
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../store/store";
import {AnyAction} from "redux";
import {fetchPacks} from "../../../reducers/packs-reducer";
import {Navigate} from "react-router-dom";

export const PacksList = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(fetchPacks())
    }, [])

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
       <div className='packs-block packs-wrapper'>
           <div className='packs-header'>
               <h1>Packs list</h1>
               <SuperButton>Add new pack</SuperButton>
           </div>
           <PacksTable/>
       </div>
    )
}