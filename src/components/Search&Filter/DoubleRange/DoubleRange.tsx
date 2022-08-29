import s from "../SearchFilter.module.css";
import {SuperDoubleRange} from "../../../common/SuperDoubleRange/SuperDoubleRange";
import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {useDebounce} from "../../../hooks/useDebounce";
import {changeMinMaxCardsCount, fetchPacks} from "../../../reducers/packs-reducer";

export const DoubleRange = () => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const dispatch = useAppDispatch()

    const [value, setValue] = useState({
        minCardsCount: minCardsCount,
        maxCardsCount: maxCardsCount,
    })

    const debouncedValue = useDebounce(value, 500)


    const onChangeHandler = useCallback((min: number, max: number) => {
        setValue({minCardsCount: min, maxCardsCount: max})
        console.log(`${min} and ${max}`)
    }, [])

    useEffect(() => {
        dispatch(changeMinMaxCardsCount({filterMinCardsCount: value.minCardsCount, filterMaxCardsCount: value.maxCardsCount}))
        dispatch(fetchPacks())
    }, [debouncedValue])

    return (
        <div className={s.rangeBlock}>
            <span>Number of cards</span>
            <SuperDoubleRange
                min={minCardsCount}
                max={maxCardsCount}
                onChangeRange={onChangeHandler}
            />
        </div>
    )
}