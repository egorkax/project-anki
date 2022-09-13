import React from 'react';
import s from '../Header.module.css'
import {AppRootStateType, useAppSelector} from "../../../store/store";
import {useSelector} from "react-redux";


export const HeaderProfile = () => {

  const name = useAppSelector(state => state.profile.name)
  const ava = useSelector<AppRootStateType, string>(state => state.profile.avatar)

  return (
    <div className={s.headerProfile}>
      <div className={s.headerName}>{name}</div>
      <div>
        <img className={s.ava} src={ava} alt="alt" width={'40px'} height={'40px'}/>
      </div>
    </div>
  )
}