import React from "react";
import {CardForm} from "../../../../forms/CardForm";
import {ModalWindow} from "../../../../common/ModalWindow/ModalWindow";

type PackModalWithFormPropsType = {
  header: string
  isOpen: boolean
  closeModalWindow: (isOpen: boolean) => void
  submitForm: (question: string, answer: string) => void
}

export const CardModalWithForm = (props: PackModalWithFormPropsType) => {
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
      <CardForm submitForm={submitForm} closeWindow={closeWindow}/>
    </ModalWindow>
  )
}