import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type superClassNameType = 'whiteButton' | 'withIcon' | 'deleteButton' | 'authButton'

type SuperButtonPropsType = DefaultButtonPropsType & {
    superClassName?: superClassNameType
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        superClassName, className,
        style,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const finalClassName = `${s.button} ${superClassName ? s[superClassName] : ''} ${className}`

    return (
        <button
            className={finalClassName}
            style={{...style}}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
