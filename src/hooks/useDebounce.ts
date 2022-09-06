import {useEffect, useState} from "react"

export const useDebounce = (value: ValueType, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}

//types
type ValueType = string | { minCardsCount: number, maxCardsCount: number }
