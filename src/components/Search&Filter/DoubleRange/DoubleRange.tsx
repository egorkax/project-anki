import s from "../SearchFilter.module.css";
import {SuperDoubleRange} from "../../../common/SuperDoubleRange/SuperDoubleRange";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {useDebounce} from "../../../hooks/useDebounce";
import {changeMinMaxCardsCount, fetchPacks} from "../../../reducers/packs-reducer";

export const DoubleRange = () => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const dispatch = useAppDispatch()

    const [value, setValue] = useState({
        min: minCardsCount,
        max: maxCardsCount,
    })

    // const debouncedValue = useDebounce(value, 500)


    const onChangeHandler = (min: number, max: number) => {
        setValue({min, max})
    }

    // useEffect(() => {
    //     dispatch(changeMinMaxCardsCount(value))
    //     dispatch(fetchPacks())
    // }, [debouncedValue])

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