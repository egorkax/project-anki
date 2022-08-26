import React from 'react';
import {NewPasswordForm} from "../../forms/NewPasswordForm";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";


export const NewPassword = () => {
  const isSentData = useSelector<AppRootStateType,boolean>(state => state.auth.isSentData)
  if(isSentData){
    return <Navigate to={'/login'}/>
  }else{
    return (
      <div className="auth-container">
        <h1>Create new password</h1>
        <NewPasswordForm/>
      </div>
    )
  }
}

