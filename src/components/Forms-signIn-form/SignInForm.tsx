import React from 'react';
import {useFormik} from 'formik';
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {signIn} from "../../store/signIn-reducer";
import {NavLink} from "react-router-dom";

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
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input id="email"
               name="email"
               type="email"
               onChange={formik.handleChange}
               value={formik.values.email}/>
        <div>{formik.errors.email}</div>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input id='password'
               type='password'
               onChange={formik.handleChange}
               value={formik.values.password}/>
        <div>{formik.errors.password}</div>
      </div>
      <div>
        <label htmlFor='rememberMe'>Remember me</label>
        <input id='rememberMe'
               type='checkbox'
               checked={formik.values.rememberMe}
               onChange={formik.handleChange}/>
      </div>
      <div>
        <button type='submit'>Sign in</button>
      </div>
      <NavLink className='' to={'/password-recovery'}>Forgot Password?</NavLink>
    </form>
  );
};
//types
type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}