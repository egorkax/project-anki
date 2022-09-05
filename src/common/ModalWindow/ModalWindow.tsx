import React, {ReactNode} from "react";
import style from './ModalWindow.module.css'
import {CloseSvgIcon} from "../../assets/icons/CloseSvgIcon";

type ModalWindowPropsType = {
    header: string
    isOpen: boolean
    closeWindow: () => void
    children: ReactNode
}

export const ModalWindow = (props: ModalWindowPropsType) => {

    const {
        header,
        isOpen,
        closeWindow,
        children,
    } = props

    const wrapperClassName = `${style.wrapper} ${isOpen ? style.open : ''}`

    return (
        <div className={wrapperClassName}>
            <div className={style.modal}>
                <div className={style.header}>
                    <h2>{header}</h2>
                    <button onClick={closeWindow} className={style.closeButton}><CloseSvgIcon fill='black'/></button>
                </div>
                <div className={style.container}>
                    {children}
                </div>
            </div>
        </div>
    )
}