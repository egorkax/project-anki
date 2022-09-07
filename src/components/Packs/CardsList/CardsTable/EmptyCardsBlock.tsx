import SuperButton from "../../../../common/SuperButton/SuperButton";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {createCard} from "../../../../reducers/cards-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../../store/store";
import {AnyAction} from "redux";
import {CardModalWithForm} from "../CardsModalWindows/CardModalWithForm";

export type EmptyCardsBlockPropsType = {
  isMy: boolean
}
export const EmptyCardsBlock = (props: EmptyCardsBlockPropsType) => {
  const [addCardOpen, setAddCardOpen] = useState(false)
  const {packId} = useParams()

  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

  const openModalAddPack = () => {
    setAddCardOpen(true)
  }

  const addCard = (question: string, answer: string) => {
    if (packId) {
      dispatch(createCard(packId, question, answer))
    }
  }

  return (
    <>
      {props.isMy ?
        <div className='empty-cards-block'>
          <CardModalWithForm header='Add new card' submitForm={addCard} isOpen={addCardOpen}
                             closeModalWindow={setAddCardOpen}/>
          <p>This pack is empty. Click add new card to fill this pack</p>
          <SuperButton onClick={openModalAddPack}>Add new card</SuperButton>
        </div>
        : <div className='empty-cards-block'>
          <p>This pack is empty.</p>
        </div>
      }
    </>
  )
}