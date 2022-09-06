import React from "react";
import {ModalWindow} from "../../../../common/ModalWindow/ModalWindow";
import {PackForm} from "../../../../forms/PackForm";

type PackModalWithFormPropsType = {
    header: string
    isOpen: boolean
    closeModalWindow: (isOpen: boolean) => void
    submitForm: (name: string, isPrivatePack: boolean) => void
}

export const PackModalWithForm = (props: PackModalWithFormPropsType) => {

    const {
        closeModalWindow,
        isOpen,
        submitForm,
        header,
    } = props

    const closeWindow = () => {
        closeModalWindow(false)
    }

    return (
        <ModalWindow header={header} isOpen={isOpen} closeWindow={closeWindow}>
           <PackForm submitForm={submitForm} closeWindow={closeWindow}/>
        </ModalWindow>
    )
}