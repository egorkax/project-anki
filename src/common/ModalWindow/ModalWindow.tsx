import React from "react";
import style from './ModalWindow.module.css'
import {CloseSvgIcon} from "../../assets/icons/CloseSvgIcon";

export const ModalWindow = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.modal}>
                <div className={style.header}>
                    <h2>Add new pack</h2>
                    <button><CloseSvgIcon fill='black'/></button>
                </div>
            </div>
        </div>
    )
}