import React from 'react';
import {useFormik} from 'formik';
import {useAppDispatch} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {AnyAction} from "redux";
import {recoveryPassword, setRecoveryStatus} from "../reducers/auth-reducer";
import SuperInput from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";




export const RecoveryPasswordForm = () => {
  const dispatch = useAppDispatch()

  const authStatus = useSelector<AppRootStateType, string>(state => state.auth.status)
  const isLoading = authStatus === 'loading'

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: values => {
      dispatch(recoveryPassword(values.email))
      dispatch(setRecoveryStatus(false))
    },
  });

  const emailError = formik.errors.email ? formik.errors.email : ''

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
      <div className='auth-desc'>Enter your email address and we will send you further instructions</div>
      <div className='auth-button-wrapper'>
        <SuperButton disabled={isLoading} isLoading={isLoading} superClassName={'authButton'} type='submit'>Send Instructions</SuperButton>
      </div>
    </form>
  );
};
//types
type FormikErrorType = {
  email?: string
}