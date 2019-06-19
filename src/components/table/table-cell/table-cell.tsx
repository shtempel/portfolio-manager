import React, { CSSProperties, FC } from 'react';

import { TableConfig } from '../table';

interface ColumnProps {
    keyValue: string;
    cellContent: string;
    tableConfig: TableConfig;
}

export const TableCell: FC<ColumnProps> = (props: ColumnProps) => {
    const { keyValue, cellContent, tableConfig } = props;
    const cellInlineStyle: CSSProperties = {
        width: parseInt(keyValue) === 0 ? 24 : tableConfig.columnWidth
    };

    return (
        <div key={ keyValue } className='cell' style={ cellInlineStyle }>
            <span key={ keyValue } id={ keyValue }>{ cellContent }</span>
        </div>
    );
};
