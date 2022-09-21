import {AppThunk} from "../store/store";
import {usersAPI} from "../api/users-api";

const initialState = {}

export const usersReducer = (state: any = initialState, action: any): any => {
  switch (action.type) {

    case '':
      return {...state}
    default:
      return state
  }
}

//actions


//thunks
export const fetchUsers = ():AppThunk => async(dispatch)=>
{
  try{
    const res = usersAPI.fetchUsers()
    console.log(res)
  }
  catch(e){
    console.log(e)
  }
}


//types
// type InitialStateType = typeof initialState

export type UsersActionType = {}
// | ReturnType<typeof setCards>
// | ReturnType<typeof changeCardsSort>
// | ReturnType<typeof changeFilterCardQuestion>
// | ReturnType<typeof setCurrentCardQuestionAndId>