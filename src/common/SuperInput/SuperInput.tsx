import React, {
    ChangeEvent,
    FocusEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    useState,
    useEffect
} from 'react'
import style from './SuperInput.module.css'
import icon from '../../assets/icons/eye.svg'

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

const SuperInput: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        label,
        name,
        onBlur,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {

    const [showMode, setShowMode] = useState(false)
    const [topLabelClass, setTopLabelClass] = useState('')

    useEffect(() => {
        restProps.value ? setTopLabelClass(style.topLabel) : setTopLabelClass('')
    }, [])


    let finalType = type
    if (type === "password" && showMode) {
        finalType = "text"
    }

    const changeShownMode = () => {
        setShowMode(!showMode)
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(e)
        if(e.currentTarget.value) {
            setTopLabelClass(style.topLabel)
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

    const onButtonEnter = () => {
        debugger
    }

    const finalLabelClassName = `${style.label} ${topLabelClass}`
    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${style.input} ${error?style.errorInput:style.superInput} ${className}`
    const finalButtonClassName = `${style.icon} ${showMode ? style.shownIcon : ''}`

    return (
        <div className={style.wrapper}>
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
            {type === 'password' ? <button type={'button'} onKeyPress={onButtonEnter} onClick={changeShownMode} className={finalButtonClassName}><img src={icon} alt=''/></button> : null}
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}

export default SuperInput
