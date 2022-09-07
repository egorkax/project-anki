import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {CardType} from "../../../../api/cards-api";
import {CardsTableItem} from "./CardsTableItem";
import {CardsTableHeader} from "./CardsTableHeader";

type CardsTablePropsType = {
  packId: string | undefined
  openEditModalWindow:()=>void
  openRemoveModalWindow:()=>void
}

export const CardsTable = ({packId, ...props}: CardsTablePropsType) => {

  const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

  return (
    <div className='table-wrapper'>
      <table>
        <CardsTableHeader packId={packId}/>
        <tbody>
        {cards.map(card => <CardsTableItem key={card._id}
                                           question={card.question}
                                           answer={card.answer}
                                           lastUpdated={card.updated}
                                           grade={card.grade}
                                           id={card._id}
                                           cardsPack_id={card.cardsPack_id}
                                           openEditModalWindow={props.openEditModalWindow}
                                           openRemoveModalWindow={props.openRemoveModalWindow}
        />)}
        </tbody>
      </table>
    </div>
  )
}