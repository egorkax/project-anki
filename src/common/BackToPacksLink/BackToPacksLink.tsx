import React from "react";
import style from './BackToPacksLink.module.css'
import {NavLink} from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";

export const BackToPacksLink = () => {
    return (
        <div className={style.backLinkWrapper}>
            <NavLink className={style.backLink} to={'/packs'}>
                <img className={style.icon} src={arrow} alt=''/>
                <span>Back to Packs List</span>
            </NavLink>
        </div>
    )
}