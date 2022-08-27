import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../store/store";
import {AnyAction} from "redux";
import {fetchCards} from "../../../reducers/cards-reducer";
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";

export const CardsList = () => {

    const {packId} = useParams()

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()


    useEffect(() => {
        if (packId) {
            dispatch(fetchCards(packId))
        }
    })

    const packName = useSelector<AppRootStateType, string>(state => state.cards.packName)

    return (
        <div className='packs-block'>
            <BackToPacksLink/>
            <div className='packs-header'>
                <h1>{packName}</h1>
                <SuperButton>Add new card</SuperButton>
            </div>

        </div>
    )
}