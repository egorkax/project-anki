import React from "react";
import style from "../PacksList/PacksTableItem/PacksTableItem.module.css";
import {EditSvgIcon} from "../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../assets/icons/DeleteSvgIcon";
import {useAppDispatch} from "../../../store/store";
import {removeCard, updateCard} from "../../../reducers/cards-reducer";

type CardsTableItemPropsType = {
  question: string
  answer: string
  lastUpdated: string
  grade: number
  id: string
  cardsPack_id: string
}

export const CardsTableItem = (props: CardsTableItemPropsType) => {

  const {
    question,
    answer,
    lastUpdated,
    grade,
    id,
    cardsPack_id,
  } = props

  const dispatch = useAppDispatch()

  const date = lastUpdated.slice(0, 10)

  const onClickDeleteCard = () => {
    dispatch(removeCard(id, cardsPack_id))
  }
  const onClickEditCard = () => {
    dispatch(updateCard(id, cardsPack_id))
  }
  return (
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{date}</td>
      <td>{grade}</td>
      <td className={style.actions}>
        <div onClick={onClickEditCard} className={style.icon}><EditSvgIcon/></div>
        <div onClick={onClickDeleteCard} className={style.icon}><DeleteSvgIcon/></div>
      </td>
    </tr>
  )
}