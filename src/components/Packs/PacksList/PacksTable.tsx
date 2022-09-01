import React from "react";
import { PacksTableHeader } from "./PacksTableHeader";
import '../PacksBlock.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {PackType} from "../../../api/packs-api";
import {PacksTableItem} from "./PacksTableItem";

export const PacksTable = () => {

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
                />)}
                </tbody>
            </table>
        </div>
    )
}