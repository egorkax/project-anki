import React from 'react';
import s from './Profile.module.css'
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {BackToPacksLink} from "../../common/BackToPacksLink/BackToPacksLink";


export const Profile = () => {

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    if(!isAuth) return <Navigate  to={'/login'}/>

    return (
        <div className={s.blockProfile}>
            <BackToPacksLink/>
            <ProfileInfo/>
        </div>
    );
};


