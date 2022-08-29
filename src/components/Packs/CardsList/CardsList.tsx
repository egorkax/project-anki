import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../store/store";
import {AnyAction} from "redux";
import {fetchCards} from "../../../reducers/cards-reducer";
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";
import '../PacksBlock.css'
import {CardsTable} from "./CardsTable";

export const CardsList = () => {

    const {packId} = useParams()
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()


    useEffect(() => {
        if (packId) {
            dispatch(fetchCards(packId))
        }
    })

    const packName = useSelector<AppRootStateType, string>(state => state.cards.packName)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div className='packs-wrapper'>
            <BackToPacksLink/>
            <div className='packs-block'>
                <div className='packs-header'>
                    <h1>{packName}</h1>
                    <SuperButton>Add new card</SuperButton>
                </div>
                <CardsTable packId={packId}/>
            </div>
        </div>
    )
}