import React from "react";
import s from "../Users/UsersTableItem.module.css";
import defaultAvatar from "../../assets/icons/photo.png";

type PacksTableItemPropsType = {
  avatar: string
  name: string
  cardsCount: number
  lastUpdated: string
  createdBy: string
  userId: string
}

export const UsersTableItem = (props: PacksTableItemPropsType) => {
  const {
    avatar,
    name,
    cardsCount,
    lastUpdated,
    createdBy,
  } = props
  const date = lastUpdated.slice(0, 10)


  return (
    <tr>
      <td className='name'>
        <img className={s.ava} width={'50px'} height={'50px'} src={avatar ? avatar : defaultAvatar} alt={'ava'}/>
        {name}
      </td>
      <td>{cardsCount}</td>
      <td>{date}</td>
      <td>{createdBy}</td>
    </tr>
  )
}