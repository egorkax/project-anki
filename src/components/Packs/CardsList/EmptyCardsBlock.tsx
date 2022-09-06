import SuperButton from "../../../common/SuperButton/SuperButton";
import React from "react";

export type EmptyCardsBlockPropsType = {
  addCard: () => void
  isMy: boolean
}
export const EmptyCardsBlock = (props: EmptyCardsBlockPropsType) => {
  return (
    <>
      {props.isMy ?
        <div className='empty-cards-block'>
          <p>This pack is empty. Click add new card to fill this pack</p>
          <SuperButton onClick={props.addCard}>Add new card</SuperButton>
        </div>
        : <div className='empty-cards-block'>
          <p>This pack is empty.</p>
        </div>
      }
    </>
  )
}