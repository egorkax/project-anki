import React, {ChangeEvent} from 'react';
import s from '../Profile.module.css'
import photo from '../../../assets/icons/photo.png'
import {uploadAvatar} from "../../../reducers/profile-reducer";
import {useAppDispatch} from "../../../store/store";

export const UploadAvatar = () => {
  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 400000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(uploadAvatar(file64))
        })
      } else {
        alert('Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string
      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const errorHandler = () => {
    alert('Кривая картинка')
  }

  return (
    <div className={s.uploadWrap}>
      <div className={s.upload}>
        <label className={s.uploadLabel}>
          <img className={s.icon} src={photo} alt="photo"/>
          <input type="file" onChange={uploadHandler} onError={errorHandler}/>
        </label>
      </div>
    </div>
  )
}
