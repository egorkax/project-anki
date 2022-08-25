import React from 'react'
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import {Login} from "./pages-components/Login";
import {SignUp} from "./pages-components/SignUp";
import {RecoveryPass} from "./pages-components/RecoveryPass";
import {NewPass} from "./pages-components/NewPass";
import {Test} from "./pages-components/test/Test";
import {Error404} from "./pages-components/Error404";


export const Pages = () => {
    let { token } = useParams();
    return (
        <div>
            <Routes>

                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу Registration*/}
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>

                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<SignUp/>}/>
                <Route path={'/password-recovery'} element={<RecoveryPass/>}/>
                <Route path={'/new-password/:token'} element={<NewPass/>}/>
                <Route path={'/test'} element={<Test/>}/>


                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route path={'/*'} element={<Error404/>}/>

            </Routes>
        </div>
    )
}

