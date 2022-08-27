import React from 'react';
import {NavLink} from "react-router-dom";
import {RecoveryPasswordForm} from "../../forms/RecoveryPasswordForm";


export const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <h1>Forgot your password?</h1>
      <RecoveryPasswordForm/>
      <div className='add-reg-block'>
        <p>Did you remember your password?</p>
        <NavLink className='underlinedLink' to={'/login'}>Try logging in</NavLink>
      </div>
    </div>
  );
}
