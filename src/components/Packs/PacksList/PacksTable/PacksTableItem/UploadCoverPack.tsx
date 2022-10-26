import React, {ChangeEvent} from 'react';
import {EditSvgIcon} from '../../../../../assets/icons/EditSvgIcon'
import {useAppDispatch, useAppSelector} from "../../../../../store/store";
import {setCurrentPackCover} from "../../../../../reducers/packs-reducer";
import defaultCover from "../../../../../assets/icons/photo.png";


export const UploadCoverPack = () => {
  const dispatch = useAppDispatch()
  const currentPackCover = useAppSelector(state => state.packs.currentPackCover)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 400000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(setCurrentPackCover(file64))
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
    <div>
      <div>
        <img width={'50px'} height={'50px'} src={currentPackCover ? currentPackCover : defaultCover} alt={'cover'}/>
        <label>
          <EditSvgIcon/>
          <input type="file" onChange={uploadHandler} onError={errorHandler}/>
        </label>
      </div>
    </div>
  )
}
