import React, {useEffect} from 'react';
import './App.css';
import '../components/Auth/AuthBlock.css'
import { HashRouter } from 'react-router-dom';
import { initializeApp } from '../reducers/app-reducer';
import { Preloader } from '../common/Loaders/Preloader/Preloader';
import { AppPagesRoutes } from './AppPagesRoutes';
import {useAppDispatch, useAppSelector} from '../store/store';
import {Header} from "../components/Header/Header";


const App = () => {

  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

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
