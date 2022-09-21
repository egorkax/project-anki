import React from "react";

export const UsersTableHeader = () => {



  return (
    <thead className='table-header'>
    <tr>
      <td className='name'>Name</td>
      <td className='cards-count'>Cards</td>
      <td className='author-name'>Created by</td>
      <td className='author-name'>Last updated</td>
    </tr>
    </thead>
  )
}