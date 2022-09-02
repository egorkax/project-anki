import React from 'react';
import {NavLink} from "react-router-dom";
import s from '../Header.module.css'
import {signOut} from "../../../reducers/auth-reducer";
import {useAppDispatch} from "../../../store/store";
import logOutIcon from "../../../assets/icons/logout.svg";
import {HeaderProfile} from "./HeaderProfile";
import {UserSvgIcon} from "../../../assets/icons/UserSvgIcon";


export const DropDownMenu = () => {
  const dispatch = useAppDispatch()
  const logOutHandler = () => {
    dispatch(signOut())
  }
  return (
    <div className={s.dropdown}>
      <HeaderProfile/>
      <div className={s.dropdownContent}>
        <NavLink to={'/profile'}><UserSvgIcon/> Profile</NavLink>
        <a onClick={logOutHandler}><img src={logOutIcon} alt={'icon'}/> Log out</a>
      </div>
    </div>
  )
}