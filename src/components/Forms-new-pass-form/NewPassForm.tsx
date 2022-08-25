import React from 'react';
import {useFormik} from 'formik';
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {setRecoveryStatus, updatePass} from "../../store/auth-reducer";
import SuperInput from '../common/c1-SuperInput/SuperInput';
import SuperButton from "../common/c2-SuperButton/SuperButton";

export const NewPassForm = () => {
  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()
  let { token } = useParams();


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
      dispatch(updatePass(values.password, token))
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