import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {AnyAction} from "redux";
import {recoveryPass} from "../../store/signIn-reducer";


export const RecoveryPassForm = () => {
  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()


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
      // alert(JSON.stringify(values))
      dispatch(recoveryPass(values.email))
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
      <div>Enter your email address and we will send you further instructions</div>
      <div>
        <button type='submit'>Send Instructions</button>
      </div>
    </form>
  );
};
//types
type FormikErrorType = {
  email?: string
}