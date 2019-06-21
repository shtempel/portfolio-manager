import React, { CSSProperties, FC } from 'react';

import { TableConfig } from '../table';

type ContentAlign = 'start' | 'end';

interface ColumnProps {
    keyValue: string;
    cellContent: string;
    cellContentAlign?: ContentAlign;
    tableConfig: TableConfig;
    additionalClass?: string;
}

export const TableCell: FC<ColumnProps> = (props: ColumnProps) => {
    const { keyValue, cellContent, tableConfig } = props;
    const cellInlineStyle: CSSProperties = {
        width: parseInt(keyValue) === 0 ? 24 : tableConfig.columnWidth,
        justifyContent: `flex-${ props.cellContentAlign }`
    };

    return (
        <div key={ keyValue } className={ `cell ${ props.additionalClass }` } style={ cellInlineStyle }>
            <span key={ keyValue } id={ keyValue }>{ cellContent }</span>
        </div>
    );
};
