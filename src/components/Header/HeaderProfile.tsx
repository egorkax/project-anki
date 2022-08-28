import React from 'react';
import ava from '../../assets/images/avatar.png'
import s from './Header.module.css'
import {useAppSelector} from "../../store/store";


export const HeaderProfile = () => {

  const name = useAppSelector(state => state.profile.name)

  return (
    <div className={s.headerProfile}>
      <div className={s.headerName}>{name}</div>
      <div>
        <img src={ava} alt="alt" width={'36px'} height={'36px'}/>
      </div>
    </div>
  )
}