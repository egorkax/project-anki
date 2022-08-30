import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./SearchFilter.module.css";
import {useDebounce} from "../../hooks/useDebounce";
import {useAppDispatch} from "../../store/store";
import {changeFilterPackName, fetchPacks} from "../../reducers/packs-reducer";

export const SearchField = () => {

    const [inputValue, setInputValue] = useState('')

    const debouncedValue = useDebounce(inputValue, 500)

    const dispatch = useAppDispatch()

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(changeFilterPackName(debouncedValue as string))
        dispatch(fetchPacks())
    }, [debouncedValue])

    return (
        <div className={s.inputItem}>
            <span>Search</span>
            <input type='text' value={inputValue} onChange={onChangeValue}/>
        </div>
    )
}