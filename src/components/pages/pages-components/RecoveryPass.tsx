import React from 'react';
import {RecoveryPassForm} from "../../RecoveryPassForm/RecoveryPassForm";
import {NavLink} from "react-router-dom";

export const RecoveryPass = () => {
  return (
    <div className="auth-container">
      <h1>Forgot your password?</h1>
      <RecoveryPassForm/>
      <div className='add-reg-block'>
        <p>Did you remember your password?</p>
        <NavLink className='underlinedLink' to={'/login'}>Try logging in</NavLink>
      </div>
    </div>
  );
}

