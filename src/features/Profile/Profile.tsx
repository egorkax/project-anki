import React from 'react';
import s from './profile.module.css'
import ava from '../../assets/avatar.png'
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {UserType} from "./profile-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {setStatus, signOut} from "../../store/auth-reducer";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import icon from "../../assets/icons/logout.svg";


export const Profile = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()
    const user = useSelector<AppRootStateType,UserType>(state => state.profile);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const authStatus = useSelector<AppRootStateType, string>(state => state.auth.status)


    if(!isAuth) return <Navigate  to={'/login'}/>

    const isLoading = authStatus === 'loading'

    const logOutHandler = () => {
        dispatch(signOut())
    }

    return (
        <div className={s.blockProfile}>
            <div className={s.profileInfo}>
                <h2 className={s.title}>Personal Information</h2>
                <div className={s.blockAvatar}>
                    <img className={s.avatar} src={ava}/>
                </div>
                <div className={s.blockName}>
                   <EditableSpan name={user.name}/>
                </div>
                <div className={s.blockEmail}>
                    <span className={s.email}>{user.email}</span>
                </div>
                <div className={s.blockButton}>
                    <SuperButton isLoading={isLoading} disabled={isLoading} onClick={logOutHandler} superClassName='withIcon'>
                        <img src={icon}/>
                        <span>Log Out</span>
                    </SuperButton>
                </div>
            </div>
        </div>
    );
};


