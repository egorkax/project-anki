import React, {useState} from 'react';
import s from './profile.module.css'
// import ava from './Icons/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'
import {LogOut} from "./Icons/LogOut";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {logOutTC, UserType} from "./profile-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";


export const Profile = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()
    const user = useSelector<AppRootStateType,UserType>(state => state.profile);

    const [isLoggedIn,setIsLoggedIn]=useState(true)

    if(!isLoggedIn){
        return <Navigate  to={'login'}/>
    }


    const logOutHandler = () => {

        dispatch(logOutTC())
    }

    return (
        <div className={s.blockProfile}>
            <div className={s.profileInfo}>
                <h2 className={s.title}>Personal Information</h2>
                <div className={s.blockAvatar}>
                    <img className={s.avatar} src={"ava"}/>
                </div>
                <div className={s.blockName}>

                   <EditableSpan name={user.name}/>
                </div>
                <div className={s.blockEmail}>
                    <span className={s.email}>random.mail@gmail.com</span>
                </div>
                <div className={s.blockButton}>
                    <button onClick={logOutHandler} className={s.button}><LogOut/>Log Out</button>
                </div>
            </div>
        </div>
    );
};


