import React, {useEffect} from 'react';
import {useAppDispatch} from "../../store/store";
import {fetchUsers} from "../../reducers/users-reducer";

export const Users = () => {
 const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchUsers())
  })
  return(
    <div>
      <h2>Users Component</h2>
    </div>
  )
}