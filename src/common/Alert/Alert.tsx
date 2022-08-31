import React, {useEffect} from "react";
import style from './Alert.module.css'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {CloseSvgIcon} from "../../assets/icons/CloseSvgIcon";
import {setAppError} from "../../reducers/app-reducer";

export const Alert = () => {

    const dispatch = useAppDispatch()

    const error = useAppSelector(state => state.app.appError)

    const alertClassName = `${style.wrapper} ${error ? style.open : ''}`

    const handleClose = () => {
        dispatch(setAppError(''))
    }

    useEffect(() => {
        if(error) {
            setTimeout(() => {
                dispatch(setAppError(''))
            }, 6000)
        }
    }, [error])

    return (
        <div className={alertClassName}>
            <div className={style.message}>{error}</div>
            <button onClick={handleClose} type='button' className={style.closeButton}><CloseSvgIcon/></button>
        </div>
    )
}