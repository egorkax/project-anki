import React from 'react';
import {NewPassForm} from "../../Forms-new-pass-form/NewPassForm";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {Navigate} from "react-router-dom";


export const NewPass = () => {
  const isSentData = useSelector<AppRootStateType,boolean>(state => state.auth.isSentData)
  if(isSentData){
    return <Navigate to={'/login'}/>
  }else{
    return (
      <div className="auth-container">
        <h1>Create new password</h1>
        <NewPassForm/>
      </div>
    )
  }
}

