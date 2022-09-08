import React from 'react';
import star from '../../assets/images/star.png'
import s from './Rating.module.css'
import {updateGrade} from "../../reducers/cards-reducer";
import {useAppDispatch} from "../../store/store";

const STARS_COUNT = 5

type RatingPropsType = {
  grade: number
  cardsPack_id: string
  card_id: string
}
export const Rating = (props: RatingPropsType) => {
  const {grade, cardsPack_id, card_id} = props
  const dispatch = useAppDispatch()

  const onClickUpdateHandler=(value:number)=>{
    dispatch(updateGrade(cardsPack_id, card_id, value))
  }

  const starsFill = Array(STARS_COUNT).fill({star})

  const starsGroup = starsFill.map((el, i) => {
    return (
      <button onClick={()=>onClickUpdateHandler(i+1)}>
        <img className={i < grade ? s.star : s.starGrayFill} src={el.star} alt="star"/>
      </button>)
  })

  return (
    <div className={s.starsWrap}>{starsGroup}</div>
  )
}