import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './SuperInputText.module.css'
import icon from '../../../assets/icons/eye.svg'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    label?:string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        label,
        name,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {

    const [showMode, setShowMode] = useState(false)
    const [topLabelClass, setTopLabelClass] = useState('')


    let finalType = type
    if (type === "password" && showMode) {
        finalType = "text"
    }

    const changeShownMode = () => {
        setShowMode(!showMode)
    }

    const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value) {
            setTopLabelClass(s.topLabel)
        } else {
            setTopLabelClass('')
        }
    }

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalLabelClassName = `${s.label} ${topLabelClass}`
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.input} ${error?s.errorInput:s.superInput} ${className}`
    const finalButtonClassName = `${s.icon} ${showMode ? s.shownIcon : ''}`

    return (
        <div className={s.wrapper}>
            <input
                type={finalType}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                name={name}
                id={name}
                onBlur={onBlurHandler}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <label className={finalLabelClassName} htmlFor={name}>{label}</label>
            {type === 'password' ? <button onClick={changeShownMode} className={finalButtonClassName}><img src={icon} alt=''/></button> : null}
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}

export default SuperInputText