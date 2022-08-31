import React from 'react';
import s from './Profile.module.css'
import {useAppSelector} from "../../store/store";
import {Navigate} from "react-router-dom";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {BackToPacksLink} from "../../common/BackToPacksLink/BackToPacksLink";


export const Profile = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth)

  if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div className={s.blockProfile}>
            <BackToPacksLink/>
            <ProfileInfo/>
        </div>
    );
};


