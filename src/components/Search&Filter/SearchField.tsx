import React, {ChangeEvent, useState} from "react";
import s from "./SearchFilter.module.css";

export const SearchField = () => {

    const [inputValue, setInputValue] = useState('')

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div className={s.inputItem}>
            <span>Search</span>
            <input type='text' value={inputValue} onChange={onChangeValue}/>
        </div>
    )
}