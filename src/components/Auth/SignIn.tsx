import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {Navigate} from "react-router-dom";
import {SignInForm} from "../../forms/SignInForm";
import {NavLink} from "react-router-dom";
import {setRecoveryStatus} from "../../reducers/auth-reducer";

export const SignIn = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const error = useAppSelector(state => state.auth.error)

  const dispatch = useAppDispatch()
  dispatch(setRecoveryStatus(false))

  if (isAuth) return <Navigate to='/profile'/>

  return (
    <div className="auth-container">
      <h1>Sign in</h1>
      {error ? <div className='auth-error'>{error}</div> : <div className='empty-auth-error'></div>}
      <SignInForm/>
      <div className='add-reg-block'>
        <p>Already have an account?</p>
        <NavLink className='underlinedLink' to={'/registration'}>Sign Up</NavLink>
      </div>
    </div>
  );
}

