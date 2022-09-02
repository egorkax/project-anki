import React, {ChangeEvent, useState} from 'react';
import {ChevronLeftIcon} from "../../assets/icons/ChevronLeftIcon";
import {ChevronRightIcon} from "../../assets/icons/ChevronRightIcon";
import s from './Paginator.module.css'


export const Paginator = (props: PaginatorType) => {
  let portionSize = 5
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    props.onChangeShowItems(Number(event.target.value))
  };

  return (
    <div className={s.wrapper}>
      <div className={s.pagesWrap}>
        <div className={s.chevron}
             onClick={() => leftPortionPageNumber > 1 && setPortionNumber(portionNumber - 1)}><ChevronLeftIcon/></div>
        <div className={s.pagesBlock}>
          {pages
            .filter((p) =>
              p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p, i) =>
              props.currentPage === p ?
                <button className={s.active}>{p}</button> :
                <button onClick={() => props.onChangePage(p)} key={i}>{p}</button>
            )}
        </div>
        <div className={s.chevron} onClick={() => setPortionNumber(portionNumber + 1)}><ChevronRightIcon/></div>
      </div>
      <div className={s.show}>
        <div>Show</div>
        <select onChange={handleChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <div>Items per Page</div>
      </div>
    </div>
  )
}
//types
type PaginatorType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onChangePage: (page: number) => void
  onChangeShowItems: (value: number) => void
}