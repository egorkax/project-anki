import React from 'react';
import {useFormik} from 'formik';
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {signIn} from '../../store/auth-reducer';
import SuperInput from "../common/c1-SuperInput/SuperInput";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/c2-SuperButton/SuperButton";

export const SignInForm = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 7) {
                errors.password = 'Password must be more than 7 characters long'
            }
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(signIn(values.email, values.password, values.rememberMe))
        },
    });

    const emailError = formik.errors.email ? formik.errors.email : ''
    const passwordError = formik.errors.password ? formik.errors.password : ''

    return (
        <form onSubmit={formik.handleSubmit}>
            <SuperInput
                label='Email'
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={emailError}
            />
            <SuperInput
                label='Password'
                id='password'
                type='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                error={passwordError}
            />
            <SuperCheckbox id='rememberMe'
                           type='checkbox'
                           checked={formik.values.rememberMe}
                           onChange={formik.handleChange}>
                Remember me
            </SuperCheckbox>

            <div className='forgotMe'>
                <NavLink to={'/password-recovery'}>Forgot Password?</NavLink>
            </div>
            <div className='auth-button-wrapper'>
                <SuperButton superClassName={'authButton'} type='submit'>Sign in</SuperButton>
            </div>
        </form>
    );
};
//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}