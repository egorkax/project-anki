import React from 'react';
import s from './profile.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import arrow from '../../assets/arrow.svg'


export const Profile = () => {

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    if(!isAuth) return <Navigate  to={'/login'}/>




    return (
        <div className={s.blockProfile}>
            <div className={s.backLinkWrapper}>
                <NavLink className={s.backLink} to={'/packs'}>
                    <img className={s.icon} src={arrow} alt=''/>
                    <span>Back to Packs List</span>
                </NavLink>
            </div>
            <ProfileInfo/>
        </div>
    );
};


