import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../../../store/store";
import {AnyAction} from "redux";
import {
    createCard,
    changeFilterCardQuestion,
    currentCardsPage,
    fetchCards,
    showCardsPerPage
} from "../../../reducers/cards-reducer";
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";
import '../PacksBlock.css'
import {CardsTable} from "./CardsTable";
import {SearchField} from "../../Search&Filter/SearchField/SearchField";
import {Paginator} from "../../../common/Paginator/Paginator";
import style from "../PacksList/PacksTable/PacksTableItem/PacksTableItem.module.css";


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

    const headerButtonName = isMy ? 'Add new card' : 'Learn pack'

    return (
        <div className='packs-wrapper'>
            <BackToPacksLink/>
            {cardsCount !== 0 ?
                <div className='packs-block'>
                    <div className='packs-header'>
                        <h1>{packName}</h1>
                        {isMy ? <SuperButton onClick={addCard}>Add new card</SuperButton>
                            : <SuperButton><NavLink to={`/packs/learn/${packId}`} className={style.icon}>Learn pack</NavLink></SuperButton>}
                    </div>
                    <SearchField searchFunction={searchCards}/>
                    <CardsTable packId={packId}/>
                    <Paginator totalItemsCount={totalCardsCount}
                               pageSize={cardsPageCount}
                               currentPage={cardsPage}
                               onChangePage={onChangePageHandler}
                               onChangeShowItems={onChangeShowItems}/>
                </div>
                : isMy ?
                    <div className='empty-cards-block'>
                        <p>This pack is empty. Click add new card to fill this pack</p>
                        <SuperButton onClick={addCard}>Add new card</SuperButton>
                    </div>
                    : <div className='empty-cards-block'>
                        <p>This pack is empty.</p>
                    </div>}
        </div>
    )
}