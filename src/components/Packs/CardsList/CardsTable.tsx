import React from "react";
import {CardsTableHeader} from "./CardsTableHeader";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {cardType} from "../../../api/cards-api";
import {CardsTableItem} from "./CardsTableItem";

type CardsTablePropsType = {
    packId: string | undefined
}

export const CardsTable = ({packId, ...props}: CardsTablePropsType) => {

    const cards = useSelector<AppRootStateType, cardType[]>(state => state.cards.cards)

    return (
        <div className='table-wrapper'>
            <table>
                <CardsTableHeader packId={packId}/>
                <tbody>
                {cards.map(card => <CardsTableItem
                    question={card.question}
                    answer={card.answer}
                    lastUpdated={card.updated}
                    grade={card.grade}
                />)}
                </tbody>
            </table>
        </div>
    )
}