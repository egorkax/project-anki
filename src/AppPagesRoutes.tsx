import React from 'react'
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import {SignIn} from "./components/Auth/SignIn";
import {SignUp} from "./components/Auth/SignUp";
import {RecoveryPassword} from "./components/Auth/RecoveryPassword";
import {NewPassword} from "./components/Auth/NewPassword";
import {Error404} from "./common/Error404/Error404";
import {Profile} from "./components/Profile/Profile";
import { PacksList } from './components/Packs/PacksList/PacksList';
import {CardsList} from "./components/Packs/CardsList/CardsList";


export const AppPagesRoutes = () => {
    let {token} = useParams();
    return (
        <>
            <Routes>

                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу Login*/}
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>

                <Route path={'/login'} element={<SignIn/>}/>
                <Route path={'/registration'} element={<SignUp/>}/>
                <Route path={'/password-recovery'} element={<RecoveryPassword/>}/>
                <Route path={'/new-password/:token'} element={<NewPassword/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/packs'} element={<PacksList/>}/>
                <Route path={'/packs/:packId'} element={<CardsList/>}/>


                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route path={'/*'} element={<Error404/>}/>

            </Routes>
        </>
    )
}

