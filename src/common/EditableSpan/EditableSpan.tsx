import React, {useState} from 'react';
import style from './EditableSpan.module.css'
import {changeUserNameTC} from "../../reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useFormik} from "formik";


export const EditableSpan = () => {

  const name = useAppSelector(state => state.profile.name)

  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch()

  const activateEditMode = () => {
    setEditMode(true);
  }

  const formik = useFormik({
    initialValues: {
      nickname: name,
    },
    onSubmit: (values) => {
      setEditMode(false)
      dispatch(changeUserNameTC(values.nickname))
    }
  })

  return (
    <div className={style.wrapper}>
      {!editMode ? (
        <span onClick={activateEditMode} className={'d'}> {name} ✎</span>
      ) : (
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor='nickname'>Nickname</label>
              <input
                  id='nickname'
                  type='text'
                  name='nickname'
                  value={formik.values.nickname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <button type="submit">SAVE</button>
            </div>
          </form>
      )
      }
    </div>

  )
};



