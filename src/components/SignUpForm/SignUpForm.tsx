import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {AnyAction} from "redux";
import {signUp} from "../../store/signup-reducer";

export const SignUpForm = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: values => {
            const errors: errorsType = {}
            if(formik.touched.password && formik.touched.confirmPassword) {
                if(values.password !== values.confirmPassword) {
                    errors.confirmPassword = 'Passwords are not the same'
                }
            }
            return errors
        },
        onSubmit: values => {
            const signUpData = {
                email: values.email,
                password: values.password,
            }
            dispatch(signUp(signUpData))
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor='email' >Email</label>
                <input id='email' type='email' {...formik.getFieldProps('email')}/>
                <div>{formik.errors.email}</div>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' {...formik.getFieldProps('password')}/>
            </div>
            <div>
                <label htmlFor='confirmPassword'>Confirm password</label>
                <input id='confirmPassword' type='password' {...formik.getFieldProps('confirmPassword')}/>
                {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
            </div>
            <div>
                <button type='submit'>Sign up</button>
            </div>
        </form>
    )
}

//types
type errorsType = {
    email?: string
    password?: string
    confirmPassword?: string
}