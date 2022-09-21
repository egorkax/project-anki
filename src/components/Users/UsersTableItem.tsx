import React from "react";

type PacksTableItemPropsType = {
  name: string
  cardsCount: number
  lastUpdated: string
  createdBy: string
  userId: string
}

export const UsersTableItem = (props: PacksTableItemPropsType) => {
  const {
    name,
    cardsCount,
    lastUpdated,
    createdBy,
  } = props
  const date = lastUpdated.slice(0, 10)


  return (
    <tr>
      <td className='name'>{name}</td>
      <td>{cardsCount}</td>
      <td>{date}</td>
      <td>{createdBy}</td>
    </tr>
  )
}