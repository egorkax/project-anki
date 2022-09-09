import React from "react";
import '../../PacksBlock.css'
import {CellWithFilter} from "../../../../common/CellWithFilter/CellWithFilter";
import {useDispatch} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {changePacksSort, fetchPacks, SORT_PACKS} from "../../../../reducers/packs-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {setAppStatus} from "../../../../reducers/app-reducer";

export const PacksTableHeader = () => {

  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, AnyAction>>()

    const sortUp = () => {
      dispatch(setAppStatus('loading'))
      dispatch(changePacksSort(SORT_PACKS.FROM_LOWER_TO_HIGHER))
      dispatch(fetchPacks())
    }
    const sortDown = () => {
      dispatch(setAppStatus('loading'))
      dispatch(changePacksSort(SORT_PACKS.FROM_HIGHER_TO_LOWER))
      dispatch(fetchPacks())
    }

  return (
    <thead className='table-header'>
    <tr>
      <td className='name'>Name</td>
      <td className='cards-count'>Cards</td>
      <CellWithFilter name='Last updated' sortUp={sortUp} sortDown={sortDown}/>
      <td className='author-name'>Created by</td>
      <td>Actions</td>
    </tr>
    </thead>
  )
}