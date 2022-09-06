import s from "../Profile.module.css";
import ava from "../../../assets/images/avatar.png";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import SuperButton from "../../../common/SuperButton/SuperButton";
import icon from "../../../assets/icons/logout.svg";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {UserType} from "../../../reducers/profile-reducer";
import {signOut} from "../../../reducers/auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const ProfileInfo = () => {
    const user = useSelector<AppRootStateType,UserType>(state => state.profile);
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()
    const authStatus = useSelector<AppRootStateType, string>(state => state.auth.status)

    const isLoading = authStatus === 'loading'
    const logOutHandler = () => {
        dispatch(signOut())
    }

  return (
    <div className={s.profileInfo}>
      <h2 className={s.title}>Personal Information</h2>
      <div className={s.blockAvatar}>
        <img className={s.avatar} src={ava} alt={'ava'}/>
      </div>
      <div className={s.blockName}>
        <EditableSpan/>
      </div>
      <div className={s.blockEmail}>
        <span className={s.email}>{user.email}</span>
      </div>
      <div className={s.blockButton}>
        <SuperButton isLoading={isLoading} disabled={isLoading} onClick={logOutHandler} superClassName='withIcon'>
          <img src={icon} alt={'icon'}/>
          <span>Log Out</span>
        </SuperButton>
      </div>
    </div>
  )
}