import React from 'react';
import {FilterSvgIcon} from "../../assets/icons/MailSvgIcon/FilterSvgIcon";
import {DoubleRange} from "./DoubleRange/DoubleRange";
import {SearchField} from "./SearchField/SearchField";
import {changeFilterPackName, fetchPacks} from "../../reducers/packs-reducer";
import {useAppDispatch} from "../../store/store";
import {WhosePacksFilter} from "./WhosePacksFilter/WhosePacksFilter";
import './SearchFilter.css'

export const SearchFilter = () => {

    const dispatch = useAppDispatch()

    const searchPacks = (debouncedValue: string) => {
        dispatch(changeFilterPackName(debouncedValue as string))
        dispatch(fetchPacks())
    }

    return (
        <div className='searchBlock'>
            <div className='searchField'>
                <SearchField searchFunction={searchPacks}/>
            </div>
            <WhosePacksFilter/>
            <DoubleRange/>

            <div className='filterButton'>
                <span>Clear</span>
                <button><FilterSvgIcon/></button>
            </div>
        </div>
    )
}