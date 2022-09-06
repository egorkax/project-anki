import React from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import style from "../PacksList/PacksTable/PacksTableItem/PacksTableItem.module.css";
import {SearchField} from "../../Search&Filter/SearchField/SearchField";
import {CardsTable} from "./CardsTable";
import {Paginator} from "../../../common/Paginator/Paginator";

export type PacksBlockPropsType = {
  packName: string
  isMy: boolean
  packId: string | undefined
  totalCardsCount: number
  cardsPageCount: number
  cardsPage: number
  addCard: () => void
  searchCards: (value: string) => void
  onChangePageHandler: (page: number) => void
  onChangeShowItems: (pageCount: number) => void
}
export const PacksBlock: React.FC<PacksBlockPropsType> = (props) => {

  return (
    <div className='packs-block'>
      <div className='packs-header'>
        <h1>{props.packName}</h1>
        {props.isMy
          ? <SuperButton onClick={props.addCard}>Add new card</SuperButton>
          : <SuperButton>
            <NavLink to={`/packs/learn/${props.packId}`} className={style.icon}>Learn pack</NavLink>
          </SuperButton>}
      </div>
      <SearchField searchFunction={props.searchCards}/>
      <CardsTable packId={props.packId}/>
      <Paginator totalItemsCount={props.totalCardsCount}
                 pageSize={props.cardsPageCount}
                 currentPage={props.cardsPage}
                 onChangePage={props.onChangePageHandler}
                 onChangeShowItems={props.onChangeShowItems}/>
    </div>
  )
}