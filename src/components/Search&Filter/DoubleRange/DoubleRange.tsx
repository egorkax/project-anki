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
  // const appStatus = useAppSelector(state => state.app.appStatus)
  //
  // const isLoading = appStatus === "loading"

  const dispatch = useAppDispatch()

  const [value, setValue] = useState({
    minCardsCount: minCardsCount,
    maxCardsCount: maxCardsCount,
  })

  const debouncedValue = useDebounce(value, 500)


  const onChangeHandler = useCallback((min: number, max: number) => {
    setValue({minCardsCount: min, maxCardsCount: max})
  },[])

  useEffect(() => {
    if (filterMinCardsCount !== value.minCardsCount || filterMaxCardsCount !== value.maxCardsCount) {
      dispatch(changeMinMaxCardsCount({
        filterMinCardsCount: value.minCardsCount,
        filterMaxCardsCount: value.maxCardsCount
      }))
      dispatch(fetchPacks())
    }
  }, [minCardsCount, maxCardsCount, debouncedValue])


  return (
    <div>
      <div className='filterLabel'>Number of cards</div>
      <SuperDoubleRange
        min={minCardsCount}
        max={maxCardsCount}
        onChangeRange={onChangeHandler}
      />
    </div>
  )
}