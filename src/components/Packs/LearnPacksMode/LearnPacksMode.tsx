import React, {useState} from "react";
import {Grades} from "./Grades/Gradex";
import {CardType} from "../../../api/cards-api";
import {LearnCard} from "./LernQuestion/LearnCard";
import s from "./Learn.module.css"
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {updateGrade} from "../../../reducers/cards-reducer";

const maxGradeValue = 6;

const getCard = (cards: Array<CardType>): CardType => {
    const sum = cards.reduce(
        (acc, card) => acc + (maxGradeValue - card.grade) * (maxGradeValue - card.grade), 0,);
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum =
                acc.sum + (maxGradeValue - card.grade) * (maxGradeValue - card.grade);

            return {sum: newSum, id: newSum < rand ? i : acc.id};
        },
        {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
};


export const LearnPacksMode = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [grade, setGrade] = useState(1);
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        questionImg: '',
        answerImg: '',
        answerVideo: '',
        questionVideo: '',
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        __v: 0,
    });

    const cards = useAppSelector(state => state.cards.cards);
    const dispatch = useAppDispatch();


    const onShowAnswer = () => setIsChecked(true);

    const onNext = (): void => {
        dispatch(updateGrade({grade, card_id: card._id}));
        setIsChecked(false);
        if (cards.length > 0) {
            setCard(getCard(cards));
        }
    };


    return (
        <div>
            <div className={s.back}>
                <BackToPacksLink/>
            </div>
            <div className={s.title}>
                Learn "Pack Name"
            </div>
            {!isChecked ? (
                    <LearnCard buttonName={'Show answer'} onClick={onShowAnswer} card={card}/>
                ) :
                <LearnCard buttonName={'Next'} onClick={onNext} card={card}>
                    <Grades setGrade={setGrade}/>
                </LearnCard>
            }
        </div>
    )
}
