import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {currentUserPage, fetchUsers, showUsersPerPage} from "../../reducers/users-reducer";
import {Navigate} from "react-router-dom";
import {Paginator} from "../../common/Paginator/Paginator";
import {UsersTableItem} from "./UsersTableItem";
import {UsersTableHeader} from "./UsersTableHeader";
import {BackToPacksLink} from "../../common/BackToPacksLink/BackToPacksLink";

export const Users = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(state => state.users.users)
  const page = useAppSelector(state => state.users.page)
  const pageCount = useAppSelector(state => state.users.pageCount)
  const usersTotalCount = useAppSelector(state => state.users.usersTotalCount)

  const isAuth = useAppSelector(state => state.auth.isAuth)


  useEffect(() => {
    if (!isAuth) {
      return
    }
    dispatch(fetchUsers())
  }, [isAuth])

  const onChangeShowItems = (pageCount: number) => {
    dispatch(showUsersPerPage(pageCount))
  }
  const onChangePageHandler = (page: number) => {
    dispatch(currentUserPage(page))
  }

  if (!isAuth) return <Navigate to={'/login'}/>
  return (
    <div>
      <div className='table-wrapper packs-wrapper'>
        <BackToPacksLink/>
        <table className='packs-block '>

          <UsersTableHeader/>
          {users.map(user =>
            <UsersTableItem name={user.name}
                            cardsCount={user.publicCardPacksCount}
                            lastUpdated={user.updated}
                            createdBy={user.created}
                            userId={user._id}

            />)}
          <Paginator totalItemsCount={usersTotalCount}
                     pageSize={pageCount}
                     currentPage={page}
                     onChangePage={onChangePageHandler}
                     onChangeShowItems={onChangeShowItems}/>
        </table>
      </div>
    </div>
  )
}