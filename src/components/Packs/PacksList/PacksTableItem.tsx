import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {NavLink} from "react-router-dom";
import style from './PacksTableItem.module.css'
import {LearnSvgIcon} from "../../../assets/icons/LearnSvgIcon";
import {EditSvgIcon} from "../../../assets/icons/EditSvgIcon";
import {DeleteSvgIcon} from "../../../assets/icons/DeleteSvgIcon";

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

    return (
        <tr>
            <td><NavLink className='pack-link' to={packId}>{name}</NavLink></td>
            <td>{cardsCount}</td>
            <td>{date}</td>
            <td>{createdBy}</td>
            <td>{
                isMy ? <div className={style.actions}>
                    <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
                    <div className={style.icon}><EditSvgIcon/></div>
                    <div className={style.icon}><DeleteSvgIcon/></div>
                </div> : <div className={style.actions}>
                    <NavLink to={`/packs/learn/${packId}`} className={style.icon}><LearnSvgIcon/></NavLink>
                </div>
            }</td>
        </tr>
    )
}