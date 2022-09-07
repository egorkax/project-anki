import React from "react";
import {ModalWindow} from "../../../../common/ModalWindow/ModalWindow";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import SuperButton from "../../../../common/SuperButton/SuperButton";
import {removeCard} from "../../../../reducers/cards-reducer";

type DeletePackModalPropsType = {
  isOpen: boolean
  closeModalWindow: (isOpen: boolean) => void
  header: string
  packId:string|undefined
}

export const DeleteCardModal = (props: DeletePackModalPropsType) => {

  const {
    isOpen,
    closeModalWindow,
    header
  } = props

  const dispatch = useAppDispatch()

  const cardQuestion = useAppSelector(state => state.cards.currentCardQuestion)
  const currentCardId = useAppSelector(state => state.cards.currentCardId)

  const closeWindow = () => {
    closeModalWindow(false)
  }

  const deleteCard = () => {
    if(props.packId) {
      dispatch(removeCard(props.packId, currentCardId))
    }
    closeWindow()
  }

  return (
    <ModalWindow header={header} isOpen={isOpen} closeWindow={closeWindow}>
      <p>Do you really want to remove:&nbsp;
        <strong>
          {cardQuestion}
        </strong>?
        Card will be deleted.
        </p>
      <div className='modal-buttons-wrapper'>
        <SuperButton superClassName='whiteButton' onClick={closeWindow}>Cancel</SuperButton>
        <SuperButton superClassName='deleteButton' onClick={deleteCard}>Delete</SuperButton>
      </div>
    </ModalWindow>
  )
}