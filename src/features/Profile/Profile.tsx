import React from 'react';
import s from './profile.module.css'
import ava from './Icons/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'
import {LogOut} from "./Icons/LogOut";
import {EditableSpan} from "./EditableSpan/EditableSpan";


export const Profile = () => {
    return (
        <div className={s.blockProfile}>
            <div className={s.profileInfo}>
                <h2 className={s.title}>Personal Information</h2>
                <div className={s.blockAvatar}>
                    <img className={s.avatar} src={ava}/>
                </div>
                <div className={s.blockName}>

                   <EditableSpan name={'Egor'}/>
                </div>
                <div className={s.blockEmail}>
                    <span className={s.email}>random.mail@gmail.com</span>
                </div>
                <div className={s.blockButton}>
                    <button className={s.button}><LogOut/>Log Out</button>
                </div>
            </div>
        </div>
    );
};


