import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {NavLink} from "react-router-dom";

type CardsTableItemPropsType = {
    question: string
    answer: string
    lastUpdated: string
    grade: number
}

export const CardsTableItem = (props: CardsTableItemPropsType) => {

    const {
        question,
        answer,
        lastUpdated,
        grade,
    } = props

    const date = lastUpdated.slice(0, 10)


    return (
        <tr>
            <td>{question}</td>
            <td>{answer}</td>
            <td>{date}</td>
            <td>{grade}</td>
        </tr>
    )
}