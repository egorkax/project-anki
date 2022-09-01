import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../../store/store";
import {NavLink} from "react-router-dom";
import style from './PacksTableItem.module.css'
import {LearnSvgIcon} from "../../../../assets/icons/LearnSvgIcon";
import {EditSvgIcon} from "../../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../../assets/icons/DeleteSvgIcon";
import {changePackNamePrivacy, deletePack} from "../../../../reducers/packs-reducer";

type PacksTableItemPropsType = {
    name: string
    cardsCount: number
    lastUpdated: string
    createdBy: string
    userId: string
    packId: string
}

export const PacksTableItem = (props: PacksTableItemPropsType) => {

    const profileId = useSelector<AppRootStateType, string>(state => state.profile._id)

    const dispatch = useAppDispatch()

    const {
        name,
        cardsCount,
        lastUpdated,
        createdBy,
        userId,
        packId,
    } = props

    const date = lastUpdated.slice(0, 10)

    const isMy = profileId === userId

    const editPack = () => {
        dispatch(changePackNamePrivacy(packId, 'Edited pack', false))
    }

    const removePack = () => {
        dispatch(deletePack(packId))
    }

    return (
        <tr>
            <td><NavLink className='pack-link' to={packId}>{name}</NavLink></td>
            <td>{cardsCount}</td>
            <td>{date}</td>
            <td>{createdBy}</td>
            <td>{
                isMy ? <div className={style.actions}>
                    <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
                    <button onClick={editPack}  className={style.icon}><EditSvgIcon/></button>
                    <button onClick={removePack} className={style.icon}><DeleteSvgIcon/></button>
                </div> : <div className={style.actions}>
                    <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
                </div>
            }</td>
        </tr>
    )
}