import React from "react";
import style from './LinearLoader.module.css'

type LinearLoaderPropsType = {
    isLoading: boolean
}

export const LinearLoader = ({isLoading, ...props}: LinearLoaderPropsType) => {

    return (
        <div className={style.plug}>
            {isLoading ?
                <div className={style.loaderWrapper}>
                    <div className={style.loader}></div>
                </div>
                : null
            }
        </div>
    )
}