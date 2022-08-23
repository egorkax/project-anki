import React from 'react';

import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {CheckEmail} from "./CheckEmail";
import {ForgotPass} from "./ForgotPass";

export const RecoveryPass = () => {
  const isSentMail = useSelector<AppRootStateType, boolean>(state => state.recovery.isSentMail)
  if (isSentMail) {
    return <CheckEmail/>
  } else {
    return <ForgotPass/>
  }
}
