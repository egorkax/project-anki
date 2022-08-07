import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {HashRouter} from "react-router-dom";
import {Pages} from "./components/pages/Pages";

const App = () => {

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
