import React from "react";
import '../PacksBlock.css'

export const PacksTableHeader = () => {
    return (
        <thead className='table-header'>
        <tr>
            <td>Name</td>
            <td>Cards</td>
            <td>Last Updated</td>
            <td>Created by</td>
            <td>Actions</td>
        </tr>
        </thead>
    )
}