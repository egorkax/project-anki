import React from "react";
import style from './WhosePacksFilter.module.css'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {changeIsMy, fetchPacks} from "../../../reducers/packs-reducer";

export const WhosePacksFilter = () => {
  const dispatch = useAppDispatch()

  const isMy = useAppSelector(state => state.packs.isMy)
  const myButtonClassName = `${style.button} ${style.myButton} ${isMy ? style.active : ''}`
  const allButtonClassName = `${style.button} ${style.allButton} ${isMy ? '' : style.active}`

  const showMyPacks = () => {
    dispatch(changeIsMy(true))
    dispatch(fetchPacks())
  }

  const showAllPacks = () => {
    dispatch(changeIsMy(false))
    dispatch(fetchPacks())
  }

  return (
    <div className={style.wrapper}>
      <span className='filterLabel'>Show packs cards</span>
      <div>
        <button onClick={showMyPacks} className={myButtonClassName}>My</button>
        <button onClick={showAllPacks} className={allButtonClassName}>All</button>
      </div>
    </div>
  )
}