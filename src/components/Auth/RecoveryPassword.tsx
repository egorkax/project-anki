import React from 'react';
import {useAppSelector} from "../../store/store";
import {CheckEmail} from "./CheckEmail";
import {ForgotPassword} from "./ForgotPassword";

export const RecoveryPassword = () => {

  const isSentData = useAppSelector(state => state.auth.isSentData)

    if (!isSentData) {
        return <ForgotPassword/>
    } else {
        return <CheckEmail/>
    }
}
