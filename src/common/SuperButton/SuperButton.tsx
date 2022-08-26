import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'
import loader from '../../assets/images/black_loader.svg'


// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type superClassNameType = 'whiteButton' | 'withIcon' | 'deleteButton' | 'authButton'

type SuperButtonPropsType = DefaultButtonPropsType & {
    superClassName?: superClassNameType
    isLoading?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        superClassName, className,
        style,
        isLoading,
        children,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const finalClassName = `${s.button} ${superClassName ? s[superClassName] : ''} ${className}`

    return (
        <button
            className={finalClassName}
            style={{...style}}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >{isLoading ? <><img alt={'loadingIcon'} className={s.loadingIcon} src={loader}/><span>{children    }</span></> : <span>{children}</span>}</button>
    )
}

export default SuperButton
