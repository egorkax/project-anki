import React from 'react';

import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {CheckEmail} from "./CheckEmail";
import {ForgotPass} from "./ForgotPass";

export const RecoveryPass = () => {
  const isSentData = useSelector<AppRootStateType, boolean>(state => state.recovery.isSentData)
  if (isSentData) {
    return <CheckEmail/>
  } else {
    return <ForgotPass/>
  }
}
