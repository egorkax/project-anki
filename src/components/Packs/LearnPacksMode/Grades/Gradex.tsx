import React, {ChangeEvent} from 'react';
import { v1 } from 'uuid';
import s from './Grades.module.css'


const grades = [
  {id: v1(), value: 1, label: 'Did not know'},
  {id: v1(), value: 2, label: 'Forgot'},
  {id: v1(), value: 3, label: 'A lot of thought'},
  {id: v1(), value: 4, label: 'Confused'},
  {id: v1(), value: 5, label: 'Knew the answer'},
];

type PropsType = {
  setGrade: (grade: number) => void;
};

export const Grades = (props: PropsType) => {

  const onChangeRadioHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    props.setGrade(+event.target.value);
  };

  return (
    <div>
      <div className={s.blockGrade}>
        Rate yourself:
        {grades.map(grade => (
          <div key={grade.id} className={s.gradeItem}>
            <label>
              <input type={"radio"} name={'grades'} value={grade.value} onChange={onChangeRadioHandle}/>
              <span className={s.gradeItemText}>{grade.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>

  )
};
