import React, {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../../../store/store";
import {AnyAction} from "redux";
import {
  changeFilterCardQuestion,
  createCard,
  currentCardsPage,
  fetchCards,
  showCardsPerPage
} from "../../../reducers/cards-reducer";
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";
import '../PacksBlock.css'
import {EmptyCardsBlock} from "./EmptyCardsBlock";
import {PacksBlock} from "./PacksBlock";


export const CardsList = () => {

  const {packId} = useParams()
  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

  const packName = useAppSelector(state => state.cards.packName)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const cardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const cardsPageCount = useAppSelector(state => state.cards.pageCount)
  const cardsPage = useAppSelector(state => state.cards.page)
  const userPackId = useAppSelector(state => state.cards.packUserId)
  const userId = useAppSelector(state => state.profile._id)

  const isMy = userPackId === userId

  useEffect(() => {
    if (packId && isAuth) {
      dispatch(fetchCards(packId))
    }
  })

  if (!isAuth) return <Navigate to={'/login'}/>

  const searchCards = (value: string) => {
    dispatch(changeFilterCardQuestion(value))
    if (packId) {
      dispatch(fetchCards(packId))
    }
  }

  const addCard = () => {
    if (packId) {
      dispatch(createCard(packId))
    }
  }

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
      {cardsCount !== 0
        ? <PacksBlock packName={packName}
                      isMy={isMy}
                      packId={packId}
                      totalCardsCount={totalCardsCount}
                      cardsPageCount={cardsPageCount}
                      cardsPage={cardsPage}
                      addCard={addCard}
                      searchCards={searchCards}
                      onChangePageHandler={onChangePageHandler}
                      onChangeShowItems={onChangeShowItems}/>

        : <EmptyCardsBlock isMy={isMy} addCard={addCard}/>
      }
    </div>
  )
}