import React from "react";
import {ModalWindow} from "../../../../common/ModalWindow/ModalWindow";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import SuperButton from "../../../../common/SuperButton/SuperButton";
import {deletePack} from "../../../../reducers/packs-reducer";

type DeletePackModalPropsType = {
    isOpen: boolean
    closeModalWindow: (isOpen: boolean) => void
}

export const DeletePackModal = (props: DeletePackModalPropsType) => {

    const {
        isOpen,
        closeModalWindow,
    } = props

    const dispatch = useAppDispatch()

    const packName = useAppSelector(state => state.packs.currentPackName)

    const closeWindow = () => {
        closeModalWindow(false)
    }

    const removePack = () => {
        dispatch(deletePack())
        closeWindow()
    }

    return (
        <ModalWindow header='Delete pack' isOpen={isOpen} closeWindow={closeWindow}>
            <p>Do you really want to remove <strong>{packName}</strong>?
                All cards will be deleted.</p>
            <div className='modal-buttons-wrapper'>
                <SuperButton superClassName='whiteButton' onClick={closeWindow}>Cancel</SuperButton>
                <SuperButton superClassName='deleteButton' onClick={removePack}>Delete</SuperButton>
            </div>
        </ModalWindow>
    )
}