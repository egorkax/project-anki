import React from 'react'
import {NavLink, useLocation, useParams} from "react-router-dom";
import s from './Header.module.css'
import logo from '../../assets/images/logo.svg'
import SuperButton from "../../common/SuperButton/SuperButton";
import {useAppSelector} from "../../store/store";
import {LinearLoader} from "../../common/Loaders/LinearLoader/LinearLoader";
import {DropDownMenu} from "./HeaderProfile/DropDownMenu";


export const Header = () => {

    const appStatus = useAppSelector(state => state.app.appStatus)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const isLoading = appStatus === "loading"

    const {pathname} = useLocation()

    return (
        <header className={s.header}>
            <div className={s.wrapper}>
                <img src={logo} alt=''/>
                {isAuth ?
                    <DropDownMenu/> :
                    pathname === '/login' ? <SuperButton><NavLink to={'/registration'}>Sign up</NavLink></SuperButton>
                        : <SuperButton><NavLink to={'/login'}>Sign in</NavLink></SuperButton>
                }
            </div>
            {isLoading ?  <LinearLoader isLoading={isLoading}/> : null}
        </header>
    )
};

