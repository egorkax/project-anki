import React from "react";
import style from "../../PacksList/PacksTable/PacksTableItem/PacksTableItem.module.css";
import {EditSvgIcon} from "../../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../../assets/icons/DeleteSvgIcon";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {setCurrentCardQuestionAndId} from "../../../../reducers/cards-reducer";
import {NavLink} from "react-router-dom";
import {LearnSvgIcon} from "../../../../assets/icons/LearnSvgIcon";
import {Rating} from "../../../../common/Rating/Rating";

type CardsTableItemPropsType = {
  question: string
  answer: string
  lastUpdated: string
  grade: number
  id: string
  cardsPack_id: string
  openEditModalWindow: () => void
  openRemoveModalWindow: () => void
}

export const CardsTableItem = (props: CardsTableItemPropsType) => {
  const {
    question,
    answer,
    lastUpdated,
    grade,
    id,
    cardsPack_id,
    openEditModalWindow,
    openRemoveModalWindow,
  } = props

  const dispatch = useAppDispatch()
  const date = lastUpdated.slice(0, 10)
  const userId = useAppSelector(state => state.profile._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const isMy = userId === packUserId

  const onClickDeleteCardHandler = () => {
    dispatch(setCurrentCardQuestionAndId(id, question))
    openRemoveModalWindow()
  }

  const onClickEditCardHandler = () => {
    dispatch(setCurrentCardQuestionAndId(id, question))
    openEditModalWindow()
  }

  return (
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{date}</td>
      <td><Rating grade={grade} cardsPack_id={cardsPack_id} card_id={id}/></td>
      <td>{
        isMy
          ? <div className={style.actions}>
            <NavLink to={`/packs/learn/${cardsPack_id}`} className={style.icon}><LearnSvgIcon/></NavLink>
            <button onClick={onClickEditCardHandler}
                    className={style.icon}>
              <EditSvgIcon/>
            </button>
            <button onClick={onClickDeleteCardHandler}
                    className={style.icon}>
              <DeleteSvgIcon/>
            </button>
          </div>
          : <div className={style.actions}>
            <NavLink to={`/packs/learn/${cardsPack_id}`} className={style.icon}><LearnSvgIcon/></NavLink>
          </div>
      }</td>
    </tr>
  )
}