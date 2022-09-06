import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../store/store";
import {NavLink} from "react-router-dom";
import style from './PacksTableItem.module.css'
import {LearnSvgIcon} from "../../../../../assets/icons/LearnSvgIcon";
import {EditSvgIcon} from "../../../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../../../assets/icons/DeleteSvgIcon";
import {deletePack, editPack} from "../../../../../reducers/packs-reducer";
import {setAppStatus} from "../../../../../reducers/app-reducer";

type PacksTableItemPropsType = {
  name: string
  cardsCount: number
  lastUpdated: string
  createdBy: string
  userId: string
  packId: string
}

export const PacksTableItem = (props: PacksTableItemPropsType) => {
  const {
    name,
    cardsCount,
    lastUpdated,
    createdBy,
    userId,
    packId,
  } = props

  const profileId = useAppSelector(state => state.profile._id)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const dispatch = useAppDispatch()
  const date = lastUpdated.slice(0, 10)
  const isMy = profileId === userId

  const editPackHandler = () => {
    dispatch(setAppStatus('loading'))
    dispatch(editPack(packId))
  }

  const removePackHandler = () => {
    dispatch(setAppStatus('loading'))
    dispatch(deletePack(packId))
  }

  return (
    <tr>
      <td className='name'><NavLink className='pack-link' to={packId}>{name}</NavLink></td>
      <td>{cardsCount}</td>
      <td>{date}</td>
      <td>{createdBy}</td>
      <td>{
        isMy
          ? <div className={style.actions}>
            <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
            <button onClick={editPackHandler}
                    className={appStatus !== 'succeed' ? style.disable : style.icon}
                    disabled={appStatus !== 'succeed'}>
              <EditSvgIcon/>
            </button>
            <button onClick={removePackHandler}
                    className={appStatus !== 'succeed' ? style.disable : style.icon}
                    disabled={appStatus !== 'succeed'}>
              <DeleteSvgIcon/>
            </button>
          </div>
          : <div className={style.actions}>
            <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
          </div>
      }</td>
    </tr>
  )
}