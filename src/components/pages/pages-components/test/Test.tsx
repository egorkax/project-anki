import React, {ChangeEvent, useState} from 'react';
import SuperInputText from '../../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../../common/c3-SuperCheckbox/SuperCheckbox';
import s from './test.module.css'
import icon from '../../../../assets/icons/logout.svg'


export const Test = () => {
    // const error = text ? '' : 'error'
    //
    // const showAlert = () => {
    //     if (error) {
    //         alert('введите текст...')
    //     } else {
    //         alert(text) // если нет ошибки показать текст
    //     }
    // }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <div className={s.column}>
                <SuperInputText
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                    // spanClassName={s.testSpanError}
                />

                <br/>

                <SuperInputText
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                    // spanClassName={s.testSpanError}
                />

                <br/>
                <SuperButton>
                    Default
                </SuperButton>
                <br/>

                <SuperButton superClassName='whiteButton'>
                    White
                </SuperButton>
                <br/>

                <SuperButton superClassName='withIcon'>
                    <img src={icon}/>
                    <span>With icon</span>
                </SuperButton>
                <br/>

                <SuperButton superClassName='authButton'>
                    Long button
                </SuperButton>
                <br/>


                <SuperButton disabled>
                    disabled
                </SuperButton>
                <br/>

                {/*----------------------------------------------------*/}

                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >
                    some text {/*// этот текст попадёт в children*/}
                </SuperCheckbox>

                {/*// onChange тоже должен работать*/}
                <SuperCheckbox checked={checked} onChange={testOnChange}/>
            </div>
        </div>
    )
}

