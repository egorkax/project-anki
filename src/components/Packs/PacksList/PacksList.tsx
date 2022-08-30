import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {PacksTable} from "./PacksTable";
import '../PacksBlock.css'
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../store/store";
import {AnyAction} from "redux";
import {addNewPack, fetchPacks} from "../../../reducers/packs-reducer";
import {Navigate} from "react-router-dom";
import {SearchFilter} from "../../Search&Filter/SearchFilter";

export const PacksList = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    const addPack = () => {
        dispatch(addNewPack('Default name'))
    }

    useEffect(() => {
        dispatch(fetchPacks())
    }, [])

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
       <div className='packs-block packs-wrapper'>
           <div className='packs-header'>
               <h1>Packs list</h1>
               <SuperButton onClick={addPack}>Add new pack</SuperButton>
           </div>
           <SearchFilter/>
           <PacksTable/>
       </div>
    )
}