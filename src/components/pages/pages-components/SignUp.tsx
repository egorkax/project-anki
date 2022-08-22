import React from 'react';
import {SignUpForm} from "../../SignUpForm/SignUpForm";
import {NavLink} from "react-router-dom";

export const SignUp = () => {
    return (
        <div className="auth-container">
            <h1>Sign Up</h1>
            <SignUpForm/>
            <div className='add-reg-block'>
                <p>Already have an account?</p>
                <NavLink className='underlinedLink' to={'/login'}>Sign In</NavLink>
            </div>
        </div>
    );
}

