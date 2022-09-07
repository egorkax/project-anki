import React, {useEffect, useState} from "react";
import {Grades} from "./Grades/Gradex";
import {CardType} from "../../../api/cards-api";
import {LearnCard} from "./LernQuestion/LearnCard";
import s from "./Learn.module.css"
import {BackToPacksLink} from "../../../common/BackToPacksLink/BackToPacksLink";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {fetchCards} from "../../../reducers/cards-reducer";
import {useParams} from "react-router-dom";

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


export const Learn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [grade, setGrade] = useState<number>(1);
  const [firstCard, setFirstCard] = useState<boolean>(true);
  const {packId} = useParams();
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
  const packName = useAppSelector(state => state.cards.packName);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstCard) {
      if (packId) {
        dispatch(fetchCards(packId));
      }
      setFirstCard(false);
    }
    if (cards.length > 0) setCard(getCard(cards));

    return () => {
      console.log('useEffect off');
    }
  }, [dispatch, packId, cards, firstCard]);
  const onShowAnswer = () => setIsChecked(true);

  const onNext = (): void => {
    // packId && dispatch(updateGrade({grade, card_id: card._id}, packId));
    setIsChecked(false);
    if (cards.length > 0) {
      setCard(getCard(cards));
    }
  };


  return (
    <div className={'packs-wrapper'}>
      <div className={s.blockLearn}>
        <div className={s.back}>
          <BackToPacksLink/>
        </div>
        <div className={s.title}>
          Learn "{packName}"
        </div>
        {!isChecked
          ? <LearnCard buttonName={'Show answer'}
                       onClick={onShowAnswer}
                       card={card}
                       isChecked={isChecked}/>
          : <LearnCard buttonName={'Next'}
                       onClick={onNext}
                       card={card}
                       isChecked={isChecked}>
            <div className={s.answer}>
              <b>Answer:</b>{card.answer}
            </div>
            <Grades setGrade={setGrade}/>
          </LearnCard>
        }
      </div>
    </div>
  )
}
