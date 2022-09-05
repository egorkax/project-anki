import React from "react";
import style from './ModalWindow.module.css'
import {CloseSvgIcon} from "../../assets/icons/CloseSvgIcon";

type ModalWindowPropsType = {
    header: string
    isOpen: boolean
}

export const ModalWindow = (props: ModalWindowPropsType) => {

    const {
        header,
        isOpen,
    } = props

    const wrapperClassName = `${style.wrapper} ${isOpen ? style.open : ''}`

    return (
        <div className={wrapperClassName    }>
            <div className={style.modal}>
                <div className={style.header}>
                    <h2>{header}</h2>
                    <button className={style.closeButton}><CloseSvgIcon fill='black'/></button>
                </div>
            </div>
        </div>
    )
}