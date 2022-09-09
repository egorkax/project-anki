import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../store/store";
import {NavLink} from "react-router-dom";
import style from './PacksTableItem.module.css'
import {LearnSvgIcon} from "../../../../../assets/icons/LearnSvgIcon";
import {EditSvgIcon} from "../../../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../../../assets/icons/DeleteSvgIcon";
import {setCurrentPackIdName} from "../../../../../reducers/packs-reducer";

type PacksTableItemPropsType = {
    name: string
    cardsCount: number
    lastUpdated: string
    createdBy: string
    userId: string
    packId: string
    openEditModalWindow: () => void
    openRemoveModalWindow: () => void
}

export const PacksTableItem = (props: PacksTableItemPropsType) => {
    const {
        name,
        cardsCount,
        lastUpdated,
        createdBy,
        userId,
        packId,
        openEditModalWindow,
        openRemoveModalWindow,
    } = props
    const dispatch = useAppDispatch()
    const profileId = useAppSelector(state => state.profile._id)
    const date = lastUpdated.slice(0, 10)
    const isMy = profileId === userId

    const openEditModal = () => {
        openEditModalWindow()
        dispatch(setCurrentPackIdName(packId, name))
    }

    const openRemoveModal = () => {
        openRemoveModalWindow()
        dispatch(setCurrentPackIdName(packId, name))
    }

    return (
        <tr>
            <td className='name'><NavLink className='pack-link' to={`/packs/${props.packId}`}>{name}</NavLink></td>
            <td>{cardsCount}</td>
            <td>{date}</td>
            <td>{createdBy}</td>
            <td>{
                isMy ? <div className={style.actions}>
                    <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
                    <button onClick={openEditModal}  className={style.icon}><EditSvgIcon/></button>
                    <button onClick={openRemoveModal} className={style.icon}><DeleteSvgIcon/></button>
                </div> : <div className={style.actions}>
                    <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
                </div>
            }</td>
        </tr>
    )
}