import React from 'react';
import './App.css';
import './authBlocks.css'
import {Header} from "./components/header/Header";
import {HashRouter} from "react-router-dom";
import {Pages} from "./components/pages/Pages";
import {Preloader} from "./components/Preloader/Preloader";

const App = () => {

    return (
        <Preloader/>
        // <div className="App">
        //     <HashRouter>
        //
        //         <Header/>
        //
        //         <Pages/>
        //
        //     </HashRouter>
        //
        // </div>
    );
}

export default App;
