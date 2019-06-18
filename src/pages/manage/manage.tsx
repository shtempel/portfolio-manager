import React, { FC } from 'react';

import { Table, TableConfig } from '../../components/table/table';

interface ManageProps {

}

export const Manage: FC<ManageProps> = (props: ManageProps) => {
    const tableConfig: TableConfig = {
        tableHeight: 400,
        columnWidth: 200,
        headerData: [ '', 'symbol', 'shares', 'buy' ],
        data: [
            [ '1', '1', '2', '3' ],
            [ '2', '4', '5', '6' ],
            [ '3', '7', '8', '9' ]
        ]
    };

    return <div><Table tableConfig={ tableConfig }/></div>;
};
