import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../../../store/store";
import {AnyAction} from "redux";
import {changeFilterCardQuestion, fetchCards} from "../../../reducers/cards-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../store/store";
import {currentCardsPage, fetchCards, showCardsPerPage} from "../../../reducers/cards-reducer";
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";
import '../PacksBlock.css'
import {CardsTable} from "./CardsTable";
import {SearchField} from "../../Search&Filter/SearchField/SearchField";
import {Paginator} from "../../../common/Paginator/Paginator";

export const CardsList = () => {

    const {packId} = useParams()
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()


    useEffect(() => {
        if (packId && isAuth) {
            dispatch(fetchCards(packId))
        }
    })

    const packName = useAppSelector(state => state.cards.packName)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const cardsCount = useAppSelector(state => state.cards.cardsTotalCount)

    if (!isAuth) return <Navigate to={'/login'}/>

    const searchCards = (value: string) => {
        dispatch(changeFilterCardQuestion(value))
        if (packId) {
            dispatch(fetchCards(packId))
        }
    }

    const addCard = () => {
        alert('new card added')
    }
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
            {cardsCount === 0 ?
                <div className='empty-cards-block'>
                    <p>This pack is empty. Click add new card to fill this pack</p>
                    <SuperButton onClick={addCard}>Add new card</SuperButton>
                </div>
            : <div className='packs-block'>
                    <div className='packs-header'>
                        <h1>{packName}</h1>
                        <SuperButton>Add new card</SuperButton>
                    </div>
                    <SearchField searchFunction={searchCards}/>
                    <CardsTable packId={packId}/>
                </div>}
        </div>
    )
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