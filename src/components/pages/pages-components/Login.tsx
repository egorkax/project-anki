import React from 'react';
import {SignInForm} from "../../SignInForm/SignInForm";
import {Navigate, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";

export const Login = () => {
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.signIn.isAuth)
  // if(isAuth){
  //   return <Navigate to={'/profile'}/>
  // }
  return (
    <div className="auth-container">
      <h1>Sign in</h1>
      <SignInForm/>
      <div className='add-reg-block'>
        <p>Already have an account?</p>
        <NavLink className='underlinedLink' to={'/registration'}>Sign Up</NavLink>
      </div>
    </div>
  );
}
