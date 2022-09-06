import React from "react";
import {PacksTableHeader} from "./PacksTableHeader";
import '../../PacksBlock.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {PackType} from "../../../../api/packs-api";
import {PacksTableItem} from "./PacksTableItem/PacksTableItem";

type PacksTablePropsType = {
  openEditModalWindow: () => void
}

export const PacksTable = (props: PacksTablePropsType) => {
  const {
    openEditModalWindow,
  } = props

  const packs = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)

  return (
    <div className='table-wrapper'>
      <table>
        <PacksTableHeader/>
        <tbody>
        {packs.map(pack =>
          <PacksTableItem key={pack._id}
                          name={pack.name}
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