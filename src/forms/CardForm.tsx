import React from "react";
import SuperInput from "../common/SuperInput/SuperInput";
import {useFormik} from "formik";
import SuperButton from "../common/SuperButton/SuperButton";

type PackFormPropsType = {
  submitForm: (question: string, answer: string) => void
  closeWindow: () => void
}

export const CardForm = ({closeWindow, submitForm, ...props}: PackFormPropsType) => {

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    onSubmit: values => {
      submitForm(values.question, values.answer)
      formik.values.question=''
      formik.values.answer=''
      closeWindow()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <select name="typeContent" id="">
        <option value="Text">Text</option>
        <option value="Text">Text</option>
      </select>
      <SuperInput
        name='question'
        id='question'
        type='text'
        label='Question'
        value={formik.values.question}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <SuperInput
        name='answer'
        id='answer'
        type='text'
        label='Answer'
        value={formik.values.answer}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className='modal-buttons-wrapper'>
        <SuperButton type='button' onClick={closeWindow} superClassName='whiteButton'>Cancel</SuperButton>
        <SuperButton type='submit'>Save</SuperButton>
      </div>
    </form>
  )
}