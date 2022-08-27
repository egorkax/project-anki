import React from 'react';
import {useFormik} from 'formik';
import {useAppDispatch} from "../store/store";
import {useParams} from "react-router-dom";
import {updatePassword} from "../reducers/auth-reducer";
import SuperInput from '../common/SuperInput/SuperInput';
import SuperButton from "../common/SuperButton/SuperButton";

export const NewPasswordForm = () => {
  const dispatch = useAppDispatch()
  let {token} = useParams();


  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Password must be more than 7 characters long'
      }
      return errors
    },
    onSubmit: values => {
      dispatch(updatePassword(values.password, token))
    },
  });

  const passwordError = formik.errors.password ? formik.errors.password : ''

  return (
    <form onSubmit={formik.handleSubmit}>
      <SuperInput
        label='Password'
        id='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
        error={passwordError}
      />
      <div className='auth-desc'>Create new password and we will send you further instructions to email</div>
      <div className='auth-button-wrapper'>
        <SuperButton superClassName='authButton' type='submit'>Create new password</SuperButton>
      </div>
    </form>
  );
};
//types
type FormikErrorType = {
  password?: string
}