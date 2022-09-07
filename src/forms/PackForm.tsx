import React from "react";
import SuperInput from "../common/SuperInput/SuperInput";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/SuperButton/SuperButton";
import {useFormik} from "formik";

type PackFormPropsType = {
    submitForm: (namePack: string, isPrivatePack: boolean) => void
    closeWindow: () => void
}

export const PackForm = ({closeWindow, submitForm, ...props}: PackFormPropsType) => {

    const formik = useFormik({
        initialValues: {
            namePack: '',
            isPrivatePack: false,
        },
        onSubmit: values => {
            submitForm(values.namePack, values.isPrivatePack)
            closeWindow()
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <SuperInput
                name='namePack'
                id='namePack'
                type='text'
                label='Name pack'
                value={formik.values.namePack}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <SuperCheckbox
                id='isPrivatePack'
                checked={formik.values.isPrivatePack}
                onChange={formik.handleChange}
            >Private pack</SuperCheckbox>
            <div className='modal-buttons-wrapper'>
                <SuperButton type='button' onClick={closeWindow} superClassName='whiteButton'>Cancel</SuperButton>
                <SuperButton type='submit'>Save</SuperButton>
            </div>
        </form>
    )
}