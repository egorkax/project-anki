import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {Navigate} from "react-router-dom";
import {SignInForm} from "../../Forms-signIn-form/SignInForm";
import { NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setRecoveryStatus} from "../../../store/recoveryPass-reducer";

export const Login = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.signUp.isAuth)

    if (isAuth) return <Navigate to='/profile'/>

    return (
        <div className="">
            <h1>Login!!!</h1>
        </div>
    );
  // const isAuth = useSelector<AppRootStateType, boolean>(state => state.signIn.isAuth)
  const dispatch=useDispatch()
  dispatch(setRecoveryStatus(false))
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

