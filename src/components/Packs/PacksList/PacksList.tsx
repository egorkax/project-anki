import React, {useEffect, useState} from "react";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {PacksTable} from "./PacksTable/PacksTable";
import '../PacksBlock.css'
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../../../store/store";
import {AnyAction} from "redux";
import {addNewPack, currentPage, editPack, fetchPacks, showItemsPerPage} from "../../../reducers/packs-reducer";
import {Navigate} from "react-router-dom";
import {SearchFilter} from "../../Search&Filter/SearchFilter";
import {Paginator} from "../../../common/Paginator/Paginator";
import {PackModalWithForm} from "./PacksModalWindows/PackModalWithForm";
import {DeletePackModal} from "./PacksModalWindows/DeletePackModal";

export const PacksList = () => {

  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const totalPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const page = useAppSelector(state => state.packs.page)

  const isLoading = appStatus === "loading"

    const [addPackOpen, setAddPackOpen] = useState(false)
    const [editPackOpen, setEditPackOpen] = useState(false)
    const [removePackOpen, setRemovePackOpen] = useState(false)


  useEffect(() => {
    if (!isAuth) {
      return
    }
    dispatch(fetchPacks())
  }, [])

  const openModalAddPack = () => {
    setAddPackOpen(true)
  }

  const openModalEditPack = () => {
    setEditPackOpen(true)
  }

    const openModalRemovePack = () => {
        setRemovePackOpen(true)
    }

    const changePack = (name: string, isPrivatePack: boolean) => {
        dispatch(editPack(name, isPrivatePack))
    }

    const addPack = (name: string, isPrivatePack: boolean) => {
        dispatch(addNewPack(name, isPrivatePack))
    }

  const onChangeShowItems = (pageCount: number) => {
    dispatch(showItemsPerPage(pageCount))
  }
  const onChangePageHandler = (page: number) => {
    dispatch(currentPage(page))
  }

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div className='packs-block packs-wrapper'>
            <PackModalWithForm header='Add new pack' submitForm={addPack} isOpen={addPackOpen}
                               closeModalWindow={setAddPackOpen}/>
            <PackModalWithForm header='Edit pack' isOpen={editPackOpen} closeModalWindow={setEditPackOpen}
                               submitForm={changePack}/>
            <DeletePackModal header={'Delete pack'} isOpen={removePackOpen} closeModalWindow={setRemovePackOpen}/>
            <div className='packs-header'>
                <h1>Packs list</h1>
                <SuperButton disabled={isLoading} onClick={openModalAddPack}>Add new
                    pack</SuperButton>
            </div>
            <SearchFilter/>
            <PacksTable
                openEditModalWindow={openModalEditPack}
                openRemoveModalWindow={openModalRemovePack}
            />
            <Paginator totalItemsCount={totalPacksCount}
                       pageSize={pageCount}
                       currentPage={page}
                       onChangePage={onChangePageHandler}
                       onChangeShowItems={onChangeShowItems}/>
        </div>
    )
}