import React, {useEffect} from 'react';
import './App.css';
import './components/Auth/AuthBlock.css'
import {HashRouter} from "react-router-dom";
import {AppPagesRoutes} from "./AppPagesRoutes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Preloader} from "./common/Preloader/Preloader";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {initializeApp} from "./reducers/app-reducer";
import { Header } from './components/Header/Header';


const App = () => {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) return <Preloader/>


    return (
        <div className="App">
            <HashRouter>


                <Header/>

                <AppPagesRoutes/>

            </HashRouter>

        </div>
    );
}

export default App;
