import React from 'react'
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import logo from '../../assets/images/logo.svg'
import SuperButton from "../../common/SuperButton/SuperButton";
import {useAppSelector} from "../../store/store";
import {HeaderProfile} from "./HeaderProfile/HeaderProfile";
import {SuperDoubleRange} from "../../common/SuperDoubleRange/SuperDoubleRange";

export const Header = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth)

  const onChangeHandler = (min: number, max: number) => {
    console.log(`min = ${min}, max = ${max}`)
  }
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <SuperDoubleRange
          min={0}
          max={100}
          onChangeRange={onChangeHandler}
        />
        <img src={logo} alt=''/>
        {!isAuth ?
          <SuperButton><NavLink to={'/login'}>Sign in</NavLink></SuperButton>
          : <HeaderProfile/>
        }
      </div>
    </header>
  )
};

