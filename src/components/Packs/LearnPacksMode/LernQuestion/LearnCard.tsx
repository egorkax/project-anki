import React, {ReactNode} from 'react';
import SuperButton from "../../../../common/SuperButton/SuperButton";
import {CardType} from "../../../../api/cards-api";
import s from './LearnCard.module.css'

type PropsType = {
    buttonName: string;
    card: CardType;
    onClick: () => void;
    children?: ReactNode;
};
export const LearnCard = (props: PropsType) => {
    const {buttonName, card, onClick, children} = props
    return (
        <div className={s.blockLearn}>
            <div className={s.question}>
                <b>Question:</b> {card.question}
            </div>
            <div className={s.attempts}>
                Number of attempts to answer the question: <b>{card.shots}</b>
            </div>
            {children}
            <SuperButton onClick={onClick}>{buttonName}</SuperButton>
        </div>

    )
        ;
};
