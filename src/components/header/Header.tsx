import React from 'react'
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import logo from '../../assets/logo.svg'
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

export const Header = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    return (
        <header className={s.header}>
           <div className={s.wrapper}>
               <img src={logo} alt=''/>
               {!isAuth ?
                   <SuperButton><NavLink to={'/login'}>Sign in</NavLink></SuperButton>
                   : null
               }
           </div>
        </header>
    )
};

