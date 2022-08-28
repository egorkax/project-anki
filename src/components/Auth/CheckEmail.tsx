import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRecoveryStatus} from "../../reducers/auth-reducer";
import SuperButton from "../../common/SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {MailSvgIcon} from "../../assets/icons/MailSvgIcon/MailSvgIcon";


export const CheckEmail = () => {
  const dispatch = useDispatch()
  const onClickHandler = () => {
    dispatch(setRecoveryStatus(false))
  }

  const recoveryEmail = useSelector<AppRootStateType, string>(state => state.auth.recoveryEmail)

  return (
    <div className="auth-container">
      <h1>Check Email</h1>
      <div className='add-reg-block'>
        <div>
          <MailSvgIcon/>
        </div>
        <div className='auth-desc'>We’ve sent an Email with instructions to {recoveryEmail}</div>
        <div className='auth-button-wrapper'>
          <NavLink className='underlinedLink' to={'/login'}>
            <SuperButton onClick={onClickHandler}>Back to login</SuperButton>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

