import React from "react";
import style from './ClearButton.module.css'
import {useAppDispatch} from "../../../store/store";
import {clearRangeAndInput} from "../../../reducers/packs-reducer";
import {FilterSvgIcon} from "../../../assets/icons/FilterSvgIcon";

export const ClearButton = () => {

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(clearRangeAndInput())
  }

  return (
    <div className={style.wrapper}>
      <button onClick={onClickHandler} className={style.button}><FilterSvgIcon/></button>
    </div>
  )
}