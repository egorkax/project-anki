import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {PacksTable} from "./PacksTable";
import '../PacksBlock.css'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {currentPage, fetchPacks, showItemsPerPage} from "../../../reducers/packs-reducer";
import {Navigate} from "react-router-dom";
import {SearchFilter} from "../../Search&Filter/SearchFilter";
import {Paginator} from "../../../common/Paginator/Paginator";

export const PacksList = () => {

  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const totalPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const page = useAppSelector(state => state.packs.page)
  const error = useAppSelector(state => state.auth.error)

  useEffect(() => {
    dispatch(fetchPacks())
  }, [])

  const onChangeShowItems = (pageCount: number) => {
    dispatch(showItemsPerPage(pageCount))
  }
  const onChangePageHandler = (page: number) => {
    dispatch(currentPage(page))
  }

  if (!isAuth) return <Navigate to={'/login'}/>

  return (
    <div className='packs-block packs-wrapper'>
      {error ? <div className='auth-error'>{error}</div> : <div className='empty-auth-error'></div>}
      <div className='packs-header'>
        <h1>Packs list</h1>
        <SuperButton>Add new pack</SuperButton>
      </div>
      <SearchFilter/>
      <PacksTable/>
      <Paginator totalItemsCount={totalPacksCount}
                 pageSize={pageCount}
                 currentPage={page}
                 onChangePage={onChangePageHandler}
                 onChangeShowItems={onChangeShowItems}/>
    </div>
  )
}