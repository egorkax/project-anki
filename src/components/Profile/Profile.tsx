import React from 'react';
import s from './Profile.module.css'
import {Navigate, NavLink} from "react-router-dom";
import {useAppSelector} from "../../store/store";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import arrow from '../../assets/images/arrow.svg'


export const Profile = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth)

  if (!isAuth) return <Navigate to={'/login'}/>

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


