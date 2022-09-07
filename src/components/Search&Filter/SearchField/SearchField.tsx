import React, {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce";
import style from './SearchField.module.css'
import {useAppSelector} from "../../../store/store";

type SearchFieldPropsType = {
  searchFunction: (debouncedValue: string) => void
}


export const SearchField = ({searchFunction, ...props}: SearchFieldPropsType) => {

  const [inputValue, setInputValue] = useState('')

  const filterPackName = useAppSelector(state => state.packs.filterPackName)
  const debouncedValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (filterPackName === '') {
      setInputValue('')
    }
  }, [filterPackName])

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (debouncedValue) {
      searchFunction(debouncedValue as string)
    }

  }, [debouncedValue])

  return (
    <div className={style.wrapper}>
      <label className='filterLabel' htmlFor='searchField'>Search</label>
      <input name='searchField' id='searchField' placeholder='Provide your text' type='text' value={inputValue}
             onChange={onChangeValue}/>
    </div>
  )
}