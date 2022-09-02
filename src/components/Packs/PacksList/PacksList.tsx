import React, {useEffect} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {PacksTable} from "./PacksTable";
import '../PacksBlock.css'
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../../../store/store";
import {AnyAction} from "redux";
import {addNewPack, currentPage, fetchPacks, showItemsPerPage} from "../../../reducers/packs-reducer";
import {Navigate} from "react-router-dom";
import {SearchFilter} from "../../Search&Filter/SearchFilter";
import {Paginator} from "../../../common/Paginator/Paginator";

export const PacksList = () => {

  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const isLoading = appStatus === "loading"

  const addPack = () => {
    dispatch(addNewPack('Default name'))
  }
  const totalPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const page = useAppSelector(state => state.packs.page)

  useEffect(() => {
    if (!isAuth) {
      return
    }
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
      <div className='packs-header'>
        <h1>Packs list</h1>
        <SuperButton isLoading={isLoading} disabled={isLoading} onClick={addPack}>Add new pack</SuperButton>
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