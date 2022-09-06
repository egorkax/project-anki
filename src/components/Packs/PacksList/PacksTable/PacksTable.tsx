import React from "react";
import { PacksTableHeader } from "./PacksTableHeader";
import '../../PacksBlock.css'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../../store/store";
import {PackType} from "../../../../api/packs-api";
import {PacksTableItem} from "./PacksTableItem/PacksTableItem";

type PacksTablePropsType = {
    openEditModalWindow: () => void
    openRemoveModalWindow: () => void
}

export const PacksTable = (props: PacksTablePropsType) => {

    const {
        openEditModalWindow,
        openRemoveModalWindow
    } = props

    const packs = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)


    return (
        <div className='table-wrapper'>
            <table>
                <PacksTableHeader/>
                <tbody>
                {packs.map(pack => <PacksTableItem name={pack.name}
                                                   cardsCount={pack.cardsCount}
                                                   lastUpdated={pack.updated}
                                                   createdBy={pack.user_name}
                                                   userId={pack.user_id}
                                                   packId={pack._id}
                                                   openEditModalWindow={openEditModalWindow}
                                                   openRemoveModalWindow={openRemoveModalWindow}
                />)}
                </tbody>
            </table>
        </div>
    )
}