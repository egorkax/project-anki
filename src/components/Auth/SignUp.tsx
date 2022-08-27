import React from 'react';
import {SignUpForm} from "../../forms/SignUpForm";
import {Navigate, NavLink} from "react-router-dom";
import {useAppSelector} from "../../store/store";

export const SignUp = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const error = useAppSelector(state => state.auth.error)

  if (isAuth) return <Navigate to='/profile'/>

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      {error ? <div className='auth-error'>{error}</div> : <div className='empty-auth-error'></div>}
      <SignUpForm/>
      <div className='add-reg-block'>
        <p>Already have an account?</p>
        <NavLink className='underlinedLink' to={'/login'}>Sign In</NavLink>
      </div>
    </div>
  );
}

