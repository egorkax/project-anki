import React from 'react';
import {SuperDoubleRange} from "../../common/SuperDoubleRange/SuperDoubleRange";
import s from './SearchFilter.module.css'
import {FilterSvgIcon} from "../../assets/icons/MailSvgIcon/FilterSvgIcon";
import {DoubleRange} from "./DoubleRange/DoubleRange";

export const SearchFilter = () => {

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
        <DoubleRange/>

      <div className={s.filterButton}>
        <span>Clear</span>
        <button><FilterSvgIcon/></button>
      </div>
    </div>
  )
}