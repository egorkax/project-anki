import "../SearchFilter.css";
import {SuperDoubleRange} from "../../../common/SuperDoubleRange/SuperDoubleRange";
import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {useDebounce} from "../../../hooks/useDebounce";
import {changeMinMaxCardsCount, fetchPacks} from "../../../reducers/packs-reducer";

export const DoubleRange = () => {

  let minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  let maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  let filterMinCardsCount = useAppSelector(state => state.packs.filterMinCardsCount)
  let filterMaxCardsCount = useAppSelector(state => state.packs.filterMaxCardsCount)

  const dispatch = useAppDispatch()

  const [value, setValue] = useState({
    minCardsCount: minCardsCount,
    maxCardsCount: maxCardsCount,
  })


  const debouncedValue = useDebounce(value, 500)


  let onChangeHandler = useCallback((min: number, max: number) => {
    setValue({minCardsCount: min, maxCardsCount: max}
    )
  }, [])


  useEffect(() => {
    if (filterMinCardsCount !== value.minCardsCount || filterMaxCardsCount !== value.maxCardsCount) {
      dispatch(changeMinMaxCardsCount({
        filterMinCardsCount: value.minCardsCount,
        filterMaxCardsCount: value.maxCardsCount
      }))
      dispatch(fetchPacks())
    }
  }, [debouncedValue])

  return (
    <div>
      <div className='filterLabel'>
        {/*{filterMinCardsCount}-------{filterMaxCardsCount}*/}
        Number of cards
      </div>
      <SuperDoubleRange
        min={0}
        max={110}
        onChangeRange={onChangeHandler}
      />
    </div>
  )
}