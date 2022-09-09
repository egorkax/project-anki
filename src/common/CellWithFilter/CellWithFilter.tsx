import React from "react";
import arrow from '../../assets/icons/Polygon 2.svg'
import style from './CellWithFilter.module.css'

type CellWithFilterPropsType = {
  name: string
  sortUp: () => void
  sortDown: () => void
}

export const CellWithFilter = (props: CellWithFilterPropsType) => {
  const {
    name,
    sortUp,
    sortDown,
  } = props

  return (
    <td className={style.wrapper}>
      <span>{name}</span>
      <div className={style.arrowWrapper}>
        <img className={style.fromHigherToLower}
             src={arrow}
             alt=''
             onClick={sortDown}/>
        <img className={style.fromLowerToHigher}
             src={arrow}
             alt=''
             onClick={sortUp}/>
      </div>
    </td>
  )
}