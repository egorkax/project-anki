import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {NavLink} from "react-router-dom";
import style from './PacksTableItem.module.css'

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
            <td className={style.actions}>{
                isMy ? <div>
                    <div><img/></div>
                    <div><img/></div>
                    <div><img/></div>
                </div> : <div>
                    <div><img/></div>
                </div>
            }</td>
        </tr>
    )
}