import {useAppDispatch} from "../../../store/store";
import {setAppStatus} from "../../../reducers/app-reducer";
import {changePackNamePrivacy, deletePack} from "../../../reducers/packs-reducer";
import {InfoIcon} from "../../../assets/icons/InfoIcon";
import {NavLink} from "react-router-dom";
import {LearnSvgIcon} from "../../../assets/icons/LearnSvgIcon";
import {EditSvgIcon} from "../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../assets/icons/DeleteSvgIcon";
import React, {useState} from "react";
import {PackModalWithForm} from "../PacksList/PacksModalWindows/PackModalWithForm";

type TitlePackWithMenuType = {
  packName: string
  packId: string | undefined
}
export const TitlePackWithMenu = (props: TitlePackWithMenuType) => {
  const dispatch = useAppDispatch()
  const [editPackOpen, setEditPackOpen] = useState(false)

  const editPackHandler = (name: string, isPrivatePack: boolean) => {
    if (props.packId) {
      dispatch(changePackNamePrivacy(props.packId, name, isPrivatePack))
    }
  }

  const removePackHandler = () => {
    dispatch(setAppStatus('loading'))
    if (props.packId) {
      dispatch(deletePack(props.packId))
    }
  }

  return (
    <>
      <PackModalWithForm header='Edit pack'
                         isOpen={editPackOpen}
                         submitForm={editPackHandler}
                         closeModalWindow={setEditPackOpen}/>
      <div className='dropdown'>
        <h1>{props.packName} <InfoIcon/></h1>
        <div className='dropdownContent'>
          <NavLink to={`/packs/learn/${props.packId}`}><LearnSvgIcon/> Learn</NavLink>
          <a onClick={() => setEditPackOpen(true)}><EditSvgIcon/> Edit</a>
          <NavLink to={`/packs/`} onClick={removePackHandler}><DeleteSvgIcon/> Delete</NavLink>
        </div>
      </div>
    </>
  )
}