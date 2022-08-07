import React from 'react'
import {NavLink} from "react-router-dom";
import s from './Header.module.css'

export const Header = () => {
    return (
        <div className={s.header}>
            <NavLink to={'/login'} className={s.link}>Login</NavLink>
            <NavLink to={'/registration'} className={s.link}>Registration</NavLink>
            <NavLink to={'/password-recovery'} className={s.link}>Password recovery</NavLink>
            <NavLink to={'/new-password'} className={s.link}>Entering a new password</NavLink>
            <NavLink to={'/test'} className={s.link}>Test</NavLink>
        </div>
    )
};

