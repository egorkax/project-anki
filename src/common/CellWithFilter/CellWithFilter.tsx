import React from "react";
import {SORT_PACKS} from "../../reducers/packs-reducer";
import arrow from '../../assets/icons/Polygon 2.svg'
import style from './CellWithFilter.module.css'
import {SORT_CARDS} from "../../reducers/cards-reducer";

type CellWithFilterPropsType = {
    name: string
    sort: string
    changeFilter: () => void
}

export const CellWithFilter = (props: CellWithFilterPropsType) => {
    const {
        name,
        sort,
        changeFilter,
    } = props


    const iconClassName = sort === SORT_PACKS.FROM_HIGHER_TO_LOWER || sort === SORT_CARDS.FROM_HIGHER_TO_LOWER
        ? style.fromHigherToLower : ''


    return (
        <td className={style.wrapper} onClick={changeFilter}>
            <span>{name}</span>
            <img className={iconClassName} src={arrow} alt=''/>
        </td>
    )
}