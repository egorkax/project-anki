import React, {useEffect, useState} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {PacksTable} from "./PacksTable/PacksTable";
import '../PacksBlock.css'
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../../../store/store";
import {AnyAction} from "redux";
import {currentPage, fetchPacks, showItemsPerPage} from "../../../reducers/packs-reducer";
import {Navigate} from "react-router-dom";
import {SearchFilter} from "../../Search&Filter/SearchFilter";
import {Paginator} from "../../../common/Paginator/Paginator";
import {AddPackModal} from "./PacksModalWindows/AddPackModal";

export const PacksList = () => {

  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const totalPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const page = useAppSelector(state => state.packs.page)

  const isLoading = appStatus === "loading"

  const [addPackOpen, setAddPackOpen] = useState(false)

  const addPack = () => {
    setAddPackOpen(true)
  }


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
      <AddPackModal isOpen={addPackOpen} closeModalWindow={setAddPackOpen}/>
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