import React from "react";
import style from './ClearButton.module.css'
import {useAppDispatch} from "../../../store/store";
import {clearFilters, fetchPacks} from "../../../reducers/packs-reducer";
import {FilterSvgIcon} from "../../../assets/icons/FilterSvgIcon";

export const ClearButton = () => {

    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(clearFilters())
        dispatch(fetchPacks())
    }

    return (
        <div className={style.wrapper}>
            <button onClick={onClickHandler} className={style.button}><FilterSvgIcon/></button>
        </div>
    )
}