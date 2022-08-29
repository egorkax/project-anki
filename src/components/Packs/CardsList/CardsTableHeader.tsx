import React from "react";
import {CellWithFilter} from "../../../common/CellWithFilter/CellWithFilter";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {changeCardsSort, fetchCards, SORT_CARDS} from "../../../reducers/cards-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

type CardsTableHeaderPropsType = {
    packId: string | undefined
}

export const CardsTableHeader = ({packId, ...props}: CardsTableHeaderPropsType) => {

    const sort = useSelector<AppRootStateType, SORT_CARDS>(state => state.cards.sortCards)

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, AnyAction>>()

    const changeFilter = () => {
        if (sort === SORT_CARDS.FROM_HIGHER_TO_LOWER) {
            dispatch(changeCardsSort(SORT_CARDS.FROM_LOWER_TO_HIGHER))
            if (packId) {
                dispatch(fetchCards(packId))
            }
        } else {
            dispatch(changeCardsSort(SORT_CARDS.FROM_HIGHER_TO_LOWER))
            if (packId) {
                dispatch(fetchCards(packId))
            }
        }
    }

    return (
        <thead  className='table-header'>
        <tr>
            <td>Question</td>
            <td>Answer</td>
            <CellWithFilter name='Last updated' sort={sort} changeFilter={changeFilter}/>
            <td>Grade</td>
        </tr>
        </thead>
    )
}