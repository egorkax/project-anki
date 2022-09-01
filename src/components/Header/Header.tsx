import React from 'react'
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import logo from '../../assets/images/logo.svg'
import SuperButton from "../../common/SuperButton/SuperButton";
import {useAppSelector} from "../../store/store";
import {HeaderProfile} from "./HeaderProfile/HeaderProfile";
import {LinearLoader} from "../../common/Loaders/LinearLoader/LinearLoader";
import {DropDownMenu} from "./HeaderProfile/DropDownMenu";


export const Header = () => {

    const appStatus = useAppSelector(state => state.app.appStatus)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const isLoading = appStatus === "loading"

    return (
        <header className={s.header}>
            <div className={s.wrapper}>
                <img src={logo} alt=''/>
                {!isAuth ?
                    <SuperButton><NavLink to={'/login'}>Sign in</NavLink></SuperButton>
                    : <HeaderProfile/>
                }
            </div>
            {isLoading ?  <LinearLoader isLoading={isLoading}/> : null}
        </header>
    )
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <img src={logo} alt=''/>
        {!isAuth ?
          <SuperButton><NavLink to={'/login'}>Sign in</NavLink></SuperButton>
          : <DropDownMenu/>
        }
      </div>
    </header>
  )
};

