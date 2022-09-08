import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {editPack, setCurrentPackIdName} from "../../../../reducers/packs-reducer";
import {MenuIcon} from "../../../../assets/icons/MenuIcon";
import {NavLink, useParams} from "react-router-dom";
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
  const {packId} = useParams()

  const dispatch = useAppDispatch()
  const [editPackOpen, setEditPackOpen] = useState(false)
  const [removePackOpen, setRemovePackOpen] = useState(false)


  const userPackId = useAppSelector(state => state.cards.packUserId)
  const profileId = useAppSelector(state => state.profile._id)

  const openModalEditPack = () => {
    setEditPackOpen(true)
  }

  const openModalRemovePack = () => {
    setRemovePackOpen(true)
    if (packId) {
      dispatch(setCurrentPackIdName(packId, props.packName))
    }
  }
  const openEditModal = () => {
    openModalEditPack()
    if (packId) {
      dispatch(setCurrentPackIdName(packId, props.packName))
    }
  }
  const changePack = (name: string, isPrivatePack: boolean) => {
    if (packId) {
      dispatch(editPack(name, isPrivatePack))
      dispatch(setCurrentPackIdName(packId, props.packName))
    }
  }

  return (
    <>
      <PackModalWithForm header='Edit pack'
                         isOpen={editPackOpen}
                         submitForm={changePack}
                         closeModalWindow={setEditPackOpen}/>
      <DeletePackModal header={'Delete pack'}
                       isOpen={removePackOpen}
                       closeModalWindow={setRemovePackOpen}/>
      <div className='dropdown'>
        <h1>{props.packName} <MenuIcon/></h1>
        {userPackId === profileId
          ?
          <div className='dropdownContent'>
            <NavLink to={`/packs/learn/${props.packId}`}><LearnSvgIcon/> Learn</NavLink>
            <a onClick={openEditModal}><EditSvgIcon/> Edit</a>
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