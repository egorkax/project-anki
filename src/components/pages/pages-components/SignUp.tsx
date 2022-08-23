import React from 'react';
import {SignUpForm} from "../../SignUpForm/SignUpForm";
import {Navigate, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";

export const SignUp = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.signUp.isAuth)
    const authError = useSelector<AppRootStateType, string>(state => state.signUp.error)
    if (isAuth) return <Navigate to='/profile'/>
    return (
        <div className="auth-container">
            <h1>Sign Up</h1>
            <div>{authError}</div>
            <SignUpForm/>
            <div className='add-reg-block'>
                <p>Already have an account?</p>
                <NavLink className='underlinedLink' to={'/login'}>Sign In</NavLink>
            </div>
        </div>
    );
}

