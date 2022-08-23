import React from 'react';
import {useFormik} from 'formik';
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";

export const NewPassForm = () => {
  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

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
      alert(JSON.stringify(values.password))
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor='password'>Password</label>
        <input id='password'
               type='password'
               onChange={formik.handleChange}
               value={formik.values.password}/>
        <div>{formik.errors.password}</div>
      </div>
      <p>Create new password and we will send you further instructions to email</p>
      <div>
        <button type='submit'>Create new password</button>
      </div>
    </form>
  );
};
//types
type FormikErrorType = {
  password?: string
}