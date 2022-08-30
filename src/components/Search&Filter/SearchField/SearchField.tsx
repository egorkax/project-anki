import React, {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce";
import style from './SearchField.module.css'

type SearchFieldPropsType = {
    searchFunction: (debouncedValue: string) => void
}


export const SearchField = ({searchFunction, ...props}: SearchFieldPropsType) => {

    const [inputValue, setInputValue] = useState('')

    const debouncedValue = useDebounce(inputValue, 500)

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    useEffect(() => {
        searchFunction(debouncedValue as string)
    }, [debouncedValue])

    return (
        <div className={style.wrapper}>
            <label className='filterLabel' htmlFor='searchField'>Search</label>
            <input name='searchField' id='searchField' placeholder='Provide your text' type='text' value={inputValue} onChange={onChangeValue}/>
        </div>
    )
}