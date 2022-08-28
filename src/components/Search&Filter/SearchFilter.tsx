import React from 'react';
import {SuperDoubleRange} from "../../common/SuperDoubleRange/SuperDoubleRange";
import s from './SearchFilter.module.css'
import {FilterSvgIcon} from "../../assets/icons/MailSvgIcon/FilterSvgIcon";

export const SearchFilter = () => {
  const onChangeHandler = (min: number, max: number) => {
    console.log(`min = ${min}, max = ${max}`)
  }
  return (
    <div className={s.searchBlock}>
      <div className={s.inputItem}>
        <span>Search</span>
        <input/>
      </div>
      <div className={s.buttonBlock}>
        <span>Show packs cards</span>
        <div>
          <button>My</button>
          <button>All</button>
        </div>
      </div>
      <div className={s.rangeBlock}>
        <span>Number of cards</span>
        <SuperDoubleRange
          min={0}
          max={100}
          onChangeRange={onChangeHandler}
        />
      </div>
      <div className={s.filterButton}>
        <span>Clear</span>
        <button><FilterSvgIcon/></button>
      </div>
    </div>
  )
}