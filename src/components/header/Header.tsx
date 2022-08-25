import React from 'react'
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import logo from '../../assets/logo.svg'
import SuperButton from "../common/c2-SuperButton/SuperButton";

export const Header = () => {
    return (
        <header className={s.header}>
           <div className={s.wrapper}>
               <img src={logo} alt=''/>
               <SuperButton><NavLink to={'/login'}>Sign up</NavLink></SuperButton>
           </div>
        </header>
    )
};

