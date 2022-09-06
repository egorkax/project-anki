import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../store/store";
import {setAuthError, signUp} from "../reducers/auth-reducer";
import SuperInput from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";


export const SignUpForm = () => {

  const dispatch = useAppDispatch()

  const authStatus = useAppSelector(state => state.auth.status)
  const isLoading = authStatus === 'loading'


  useEffect(() => {
    return () => {
      dispatch(setAuthError(''))
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: errorsType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Password must be more than 7 characters long'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords are not the same'
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

  const emailError = formik.touched.email && formik.errors.email ? formik.errors.email : ''
  const passwordError = formik.touched.password && formik.errors.password ? formik.errors.password : ''
  const confirmPasswordError = formik.touched.confirmPassword && formik.errors.confirmPassword ?
    formik.errors.confirmPassword : ''

  return (
    <form onSubmit={formik.handleSubmit}>
      <SuperInput
        label='Email'
        id='email'
        type='email'
        {...formik.getFieldProps('email')}
        error={emailError}
      />
      <SuperInput
        label='Password'
        id='password'
        type='password'
        {...formik.getFieldProps('password')}
        error={passwordError}
      />
      <SuperInput
        label='Confirm password'
        id='confirmPassword'
        type='password'
        {...formik.getFieldProps('confirmPassword')}
        error={confirmPasswordError}
      />
      <div className='auth-button-wrapper'>
        <SuperButton superClassName='authButton' type='submit'>Sign up</SuperButton>
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