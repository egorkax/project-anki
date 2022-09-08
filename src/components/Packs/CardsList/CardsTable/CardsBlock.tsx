import React, {useState} from "react";
import SuperButton from "../../../../common/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import style from "../../PacksList/PacksTable/PacksTableItem/PacksTableItem.module.css";
import {SearchField} from "../../../Search&Filter/SearchField/SearchField";
import {CardsTable} from "./CardsTable";
import {Paginator} from "../../../../common/Paginator/Paginator";
import {TitlePackWithMenu} from "../../PacksList/PacksTable/TitlePackWithMenu";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../../store/store";
import {AnyAction} from "redux";
import {updateCard} from "../../../../reducers/cards-reducer";
import {CardModalWithForm} from "../CardsModalWindows/CardModalWithForm";
import {DeleteCardModal} from "../CardsModalWindows/DeleteCardModal";

export type PacksBlockPropsType = {
  packName: string
  isMy: boolean
  packId: string | undefined
  totalCardsCount: number
  cardsPageCount: number
  cardsPage: number
  searchCards: (value: string) => void
  onChangePageHandler: (page: number) => void
  onChangeShowItems: (pageCount: number) => void
  addCard: (question: string, answer: string) => void
}
export const CardsBlock: React.FC<PacksBlockPropsType> = (props) => {
  const [addCardOpen, setAddCardOpen] = useState(false)
  const [editCardOpen, setEditCardOpen] = useState(false)
  const [removeCardOpen, setRemoveCardOpen] = useState(false)

  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

  const openModalAddPack = () => {
    setAddCardOpen(true)
  }

  const openModalEditPack = () => {
    setEditCardOpen(true)
  }

  const openModalRemovePack = () => {
    setRemoveCardOpen(true)
  }


  const editCard = (question: string, answer: string) => {
    if (props.packId) {
      dispatch(updateCard(props.packId, question, answer))
    }
  }

  return (
    <div className='packs-block'>
      <CardModalWithForm header='Add new card' submitForm={props.addCard} isOpen={addCardOpen}
                         closeModalWindow={setAddCardOpen}/>
      <CardModalWithForm header='Edit card' isOpen={editCardOpen} closeModalWindow={setEditCardOpen}
                         submitForm={editCard}/>
      <DeleteCardModal header='Delete card'
                       isOpen={removeCardOpen}
                       packId={props.packId}
                       closeModalWindow={setRemoveCardOpen}/>
      <div className='packs-header'>
        <TitlePackWithMenu packName={props.packName}
                           packId={props.packId}
                           />
        {props.isMy
          ? <SuperButton onClick={openModalAddPack}>Add new card</SuperButton>
          : <SuperButton>
            <NavLink to={`/packs/learn/${props.packId}`} className={style.icon}>Learn pack</NavLink>
          </SuperButton>}
      </div>
      <SearchField searchFunction={props.searchCards}/>
      <CardsTable packId={props.packId}
                  openEditModalWindow={openModalEditPack}
                  openRemoveModalWindow={openModalRemovePack}
      />
      <Paginator totalItemsCount={props.totalCardsCount}
                 pageSize={props.cardsPageCount}
                 currentPage={props.cardsPage}
                 onChangePage={props.onChangePageHandler}
                 onChangeShowItems={props.onChangeShowItems}/>
    </div>
  )
}
