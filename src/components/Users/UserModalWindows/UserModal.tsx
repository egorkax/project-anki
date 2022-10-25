import React from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ModalWindow} from "../../../common/ModalWindow/ModalWindow";
import s from "../UsersTableItem.module.css";
import defaultAvatar from "../../../assets/icons/photo.png";

type DeletePackModalPropsType = {
  isOpen: boolean
  closeModalWindow: (isOpen: boolean) => void
  header: string
  avatar: string
  name: string
  cardsCount: number
  userId: string
}

export const UserModal = (props: DeletePackModalPropsType) => {
  const {
    isOpen,
    closeModalWindow,
    header,
    avatar,
    name,
    cardsCount,
  } = props

  const closeWindow = () => {
    closeModalWindow(false)
  }
  const onClickHandler = () => {
  }
  return (
    <ModalWindow header={header} isOpen={isOpen} closeWindow={closeWindow}>
      <img className={s.ava} width={'100px'} height={'100px'} src={avatar ? avatar : defaultAvatar} alt={'ava'}/>
      <strong>{name}</strong>
      <p>Total created cards: {cardsCount}</p>
      <div className='modal-buttons-wrapper'>
        <SuperButton superClassName='whiteButton' onClick={onClickHandler}>Packs</SuperButton>
      </div>
    </ModalWindow>
  )
}