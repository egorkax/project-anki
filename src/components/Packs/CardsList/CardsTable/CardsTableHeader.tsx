import React from "react";
import {CellWithFilter} from "../../../../common/CellWithFilter/CellWithFilter";
import {changeCardsSort, fetchCards, SORT_CARDS} from "../../../../reducers/cards-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../../../store/store";
import {AnyAction} from "redux";
import {setAppStatus} from "../../../../reducers/app-reducer";

type CardsTableHeaderPropsType = {
  packId: string | undefined
}

export const CardsTableHeader = ({packId}: CardsTableHeaderPropsType) => {
  const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, AnyAction>>()

  const sortDown = () => {
    dispatch(changeCardsSort(SORT_CARDS.FROM_LOWER_TO_HIGHER))
    if (packId) {
      dispatch(setAppStatus('loading'))
      dispatch(fetchCards(packId))
    }
  }
  const sortUp = () => {
    dispatch(changeCardsSort(SORT_CARDS.FROM_HIGHER_TO_LOWER))
    if (packId) {
      dispatch(setAppStatus('loading'))
      dispatch(fetchCards(packId))
    }
  }

  return (
    <thead className='table-header'>
    <tr>
      <td>Question</td>
      <td>Answer</td>
      <CellWithFilter name='Last updated' sortUp={sortUp} sortDown={sortDown}/>
      <td>Grade</td>
      <td>Actions</td>
    </tr>
    </thead>
  )
}