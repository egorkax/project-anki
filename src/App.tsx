import React, {useEffect} from 'react';
import './App.css';
import './authBlocks.css'
import {Header} from "./components/header/Header";
import {HashRouter} from "react-router-dom";
import {Pages} from "./components/pages/Pages";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Preloader} from "./components/Preloader/Preloader";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {initializeApp} from "./store/app-reducer";

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

                <Pages/>

            </HashRouter>

        </div>
    );
}

export default App;
