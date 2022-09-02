import React from "react";
import '../PacksBlock.css'
import {CellWithFilter} from "../../../common/CellWithFilter/CellWithFilter";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {changePacksSort, fetchPacks, SORT_PACKS} from "../../../reducers/packs-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const PacksTableHeader = () => {

    const sort = useSelector<AppRootStateType, SORT_PACKS>(state => state.packs.sortPacks)

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, AnyAction>>()


    const changeFilter = () => {
        if (sort === SORT_PACKS.FROM_HIGHER_TO_LOWER) {
            dispatch(changePacksSort(SORT_PACKS.FROM_LOWER_TO_HIGHER))
            dispatch(fetchPacks())
        } else {
            dispatch(changePacksSort(SORT_PACKS.FROM_HIGHER_TO_LOWER))
            dispatch(fetchPacks())
        }
    }

    return (
        <thead className='table-header'>
        <tr>
            <td className='name'>Name</td>
            <td>Cards</td>
            <CellWithFilter name='Last updated' sort={sort} changeFilter={changeFilter}/>
            <td>Created by</td>
            <td>Actions</td>
        </tr>
        </thead>
    )
}