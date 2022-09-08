import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {editPack, setCurrentPackIdName} from "../../../../reducers/packs-reducer";
import {MenuIcon} from "../../../../assets/icons/MenuIcon";
import {Navigate, NavLink} from "react-router-dom";
import {LearnSvgIcon} from "../../../../assets/icons/LearnSvgIcon";
import {EditSvgIcon} from "../../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../../assets/icons/DeleteSvgIcon";
import React, {useState} from "react";
import {PackModalWithForm} from "../PacksModalWindows/PackModalWithForm";
import {DeletePackModal} from "../PacksModalWindows/DeletePackModal";

type TitlePackWithMenuType = {
  packName: string
  packId: string | undefined
}
export const TitlePackWithMenu = (props: TitlePackWithMenuType) => {
  const dispatch = useAppDispatch()
  const [editPackOpen, setEditPackOpen] = useState(false)
  const [removePackOpen, setRemovePackOpen] = useState(false)

  const userPackId = useAppSelector(state => state.cards.packUserId)
  const userId = useAppSelector(state => state.profile._id)

  const openModalRemovePack = () => {
    setRemovePackOpen(true)
    if (props.packId) {
      dispatch(setCurrentPackIdName(props.packId, props.packName))
    }
  }
  const editPackHandler = (name: string, isPrivatePack: boolean) => {
    if (props.packId) {
      dispatch(setCurrentPackIdName(props.packId, props.packName))
      dispatch(editPack(name, isPrivatePack))
    }
  }

  return (
    <>
      <PackModalWithForm header='Edit pack'
                         isOpen={editPackOpen}
                         submitForm={editPackHandler}
                         closeModalWindow={setEditPackOpen}/>
      <DeletePackModal header={'Delete pack'}
                       isOpen={removePackOpen}
                       closeModalWindow={setRemovePackOpen}/>
      <div className='dropdown'>
        <h1>{props.packName} <MenuIcon/></h1>
        {userPackId === userId
          ?
          <div className='dropdownContent'>
            <NavLink to={`/packs/learn/${props.packId}`}><LearnSvgIcon/> Learn</NavLink>
            <a onClick={() => setEditPackOpen(true)}><EditSvgIcon/> Edit</a>
            <a onClick={openModalRemovePack}><DeleteSvgIcon/> Delete</a>
          </div>
          :
          <div className='dropdownContent'>
            <NavLink to={`/packs/learn/${props.packId}`}><LearnSvgIcon/> Learn</NavLink>
          </div>}
      </div>
    </>
  )
}