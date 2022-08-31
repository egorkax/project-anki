import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../store/store";
import {currentCardsPage, fetchCards, showCardsPerPage} from "../../../reducers/cards-reducer";
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";
import '../PacksBlock.css'
import {CardsTable} from "./CardsTable";
import {Paginator} from "../../../common/Paginator/Paginator";

export const CardsList = () => {

  const {packId} = useParams()
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (packId) {
      dispatch(fetchCards(packId))
    }
  },[])

  const packName = useSelector<AppRootStateType, string>(state => state.cards.packName)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const cardsPageCount = useAppSelector(state => state.cards.pageCount)
  const cardsPage = useAppSelector(state => state.cards.page)
  const error = useAppSelector(state => state.auth.error)

  const onChangeShowItems = (pageCount: number) => {
    if (packId) {
      dispatch(showCardsPerPage(pageCount, packId))
    }
  }
  const onChangePageHandler = (page: number) => {
    if (packId) {
      dispatch(currentCardsPage(page, packId))
    }
  }

  if (!isAuth) return <Navigate to={'/login'}/>

  return (
    <div className='packs-wrapper'>
      <BackToPacksLink/>
      <div className='packs-block'>
        {error ? <div className='auth-error'>{error}</div> : <div className='empty-auth-error'></div>}
        <div className='packs-header'>
          <h1>{packName}</h1>
          <SuperButton>Add new card</SuperButton>
        </div>
        <CardsTable packId={packId}/>
        <Paginator totalItemsCount={totalCardsCount}
                   pageSize={cardsPageCount}
                   currentPage={cardsPage}
                   onChangePage={onChangePageHandler}
                   onChangeShowItems={onChangeShowItems}/>
      </div>
    </div>
  )
}