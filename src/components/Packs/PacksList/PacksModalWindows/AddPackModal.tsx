import React from "react";
import {ModalWindow} from "../../../../common/ModalWindow/ModalWindow";
import {AddNewPackForm} from "../../../../forms/AddNewPackForm";

type AddPackModalPropsType = {
    isOpen: boolean
    closeModalWindow: (isOpen: boolean) => void
}

export const AddPackModal = (props: AddPackModalPropsType) => {

    const {
        closeModalWindow,
        isOpen,
    } = props

    const closeWindow = () => {
        closeModalWindow(false)
    }

    return (
        <ModalWindow header='Add new pack' isOpen={isOpen} closeWindow={closeWindow}>
           <AddNewPackForm closeWindow={closeWindow}/>
        </ModalWindow>
    )
}