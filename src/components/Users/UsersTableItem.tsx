import React, {useState} from "react";
import s from "../Users/UsersTableItem.module.css";
import defaultAvatar from "../../assets/icons/photo.png";
import {UserModal} from "./UserModalWindows/UserModal";

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
    userId
  } = props
  const date = lastUpdated.slice(0, 10)
  const [userOpen, setUserOpen] = useState(false)

  const openUserInfo = () => {
    setUserOpen(true)
  }

  return (
    <>
      <UserModal header={'User info'}
                 isOpen={userOpen}
                 closeModalWindow={setUserOpen}
                 avatar={avatar}
                 name={name}
                 cardsCount={cardsCount}
                 userId={userId}/>
      <tr className={s.userItem} onClick={openUserInfo}>
        <td className='name'>
          <p className={s.nameWithAva}>
            <img className={s.ava} width={'50px'} height={'50px'} src={avatar ? avatar : defaultAvatar} alt={'ava'}/>
            {name}
          </p>
        </td>
        <td>{cardsCount}</td>
        <td>{date}</td>
        <td>{createdBy}</td>
      </tr>
    </>

  )
}