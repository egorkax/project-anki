import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {Navigate} from "react-router-dom";
import {SignInForm} from "../../Forms-signIn-form/SignInForm";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setRecoveryStatus} from "../../../store/auth-reducer";

export const Login = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const error = useSelector<AppRootStateType, string>(state => state.auth.error)
    const dispatch = useDispatch()
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

