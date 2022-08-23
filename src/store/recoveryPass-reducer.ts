import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {RecoveryPassAPI} from "../api/recoveryPass-api";


const IS_SENT_MAIL = 'project_anki/password-recovery/IS-SENT-MAIL'


const initialState: initialStateType = {
  isSentMail: false
}

export const recoveryPassReducer = (state = initialState, action: actionType): initialStateType => {
  switch (action.type) {
    case IS_SENT_MAIL:
      return {...state, isSentMail: action.isSentMail}
    default:
      return state
  }
}

//actions
export const setMailStatus = (isSentMail:boolean) => ({
  type: IS_SENT_MAIL,
  isSentMail
} as const)

//thunks

export const recoveryPass = (email: string) => async function (dispatch:Dispatch) {
  try {
    const payload = {
      email: email,
      from: 'test-front-admin <angor78@gmail.com>',
      message:
        `<div style="background-color: whitesmoke;text-align: center ">
        <h2>Password recovery</h2>
        <div>
          Please use the following link to reset your password: 
            <a href='http://localhost:3000/#/new-password/$token$'>
              Password recovery
            </a>      
          <br/>
          If you didn’t make this request, then you can ignore this email 🙂
          <br/>
        </div>
      </div>`
    }
    const response = await RecoveryPassAPI.recovery(payload)
    if(response.data.info==='sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—'){
        dispatch(setMailStatus(true))
    }
  } catch (e) {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
      console.log(error)
    } else {
      console.log(err.message)
    }
  }
}


//types
type initialStateType = {
  isSentMail: boolean
}

type actionType =
  | ReturnType<typeof setMailStatus>


