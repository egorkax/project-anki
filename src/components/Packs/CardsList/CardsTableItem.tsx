import React from "react";
import style from "../PacksList/PacksTableItem.module.css";
import {EditSvgIcon} from "../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../assets/icons/DeleteSvgIcon";
import s from './CardsTableItem.module.css'

type CardsTableItemPropsType = {
  question: string
  answer: string
  lastUpdated: string
  grade: number
}

export const CardsTableItem = (props: CardsTableItemPropsType) => {

  const {
    question,
    answer,
    lastUpdated,
    grade,
  } = props

  const date = lastUpdated.slice(0, 10)


  return (
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{date}</td>
      <td>{grade}</td>
      <td className={s.actions}>
        <div className={style.icon}><EditSvgIcon/></div>
        <div className={style.icon}><DeleteSvgIcon/></div>
      </td>
    </tr>
  )
}