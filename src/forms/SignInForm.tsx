import React from 'react';
import {useFormik} from 'formik';
import {AppRootStateType, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {signIn} from '../reducers/auth-reducer';
import SuperInput from "../common/SuperInput/SuperInput";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/SuperButton/SuperButton";

export const SignInForm = () => {
  const dispatch = useAppDispatch()
  const authStatus = useSelector<AppRootStateType, string>(state => state.auth.status)

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

  const emailError = formik.errors.email && formik.touched.email ? formik.errors.email : ''
  const passwordError = formik.errors.password && formik.touched.password ? formik.errors.password : ''

  const isLoading = authStatus === 'loading'

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
        onBlur={formik.handleBlur}
      />
      <SuperInput
        label='Password'
        id='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
        error={passwordError}
        onBlur={formik.handleBlur}
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
        <SuperButton disabled={isLoading} isLoading={isLoading} superClassName={'authButton'} type='submit'>Sign
          in</SuperButton>
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