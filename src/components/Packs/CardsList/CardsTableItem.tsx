import React from "react";
import style from "../PacksList/PacksTable/PacksTableItem/PacksTableItem.module.css";
import {EditSvgIcon} from "../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../assets/icons/DeleteSvgIcon";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {removeCard, updateCard} from "../../../reducers/cards-reducer";
import {NavLink} from "react-router-dom";
import {LearnSvgIcon} from "../../../assets/icons/LearnSvgIcon";

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
  const userId = useAppSelector(state => state.profile._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)

  const date = lastUpdated.slice(0, 10)

  const onClickDeleteCard = () => {
    dispatch(removeCard(cardsPack_id, id))
  }

  const onClickEditCard = () => {
    dispatch(updateCard(cardsPack_id, id))
  }
  const isMy = userId === packUserId

  return (
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{date}</td>
      <td>{grade}</td>
      <td>{
        isMy ? <div className={style.actions}>
          <NavLink to={`/packs/learn/${cardsPack_id}`} className={style.icon}><LearnSvgIcon/></NavLink>
          <button onClick={onClickEditCard} className={style.icon}><EditSvgIcon/></button>
          <button onClick={onClickDeleteCard} className={style.icon}><DeleteSvgIcon/></button>
        </div> : <div className={style.actions}>
          <NavLink to={`/packs/learn/${cardsPack_id}`} className={style.icon}><LearnSvgIcon/></NavLink>
        </div>
      }</td>
    </tr>
  )
}