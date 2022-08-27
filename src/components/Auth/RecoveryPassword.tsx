import React from 'react';

import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {CheckEmail} from "./CheckEmail";
import {ForgotPassword} from "./ForgotPassword";

export const RecoveryPassword = () => {
    const isSentData = useSelector<AppRootStateType, boolean>(state => state.auth.isSentData)
    if (!isSentData) {
        return <ForgotPassword/>
    } else {
        return <CheckEmail/>
    }
}
