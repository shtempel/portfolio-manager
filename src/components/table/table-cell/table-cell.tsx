import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { Icon } from '../..';
import { TableConfig } from '../table';

interface ColumnProps {
    keyValue: string;
    row: string;
    cellContent: string;
    tableConfig: TableConfig;
    checked?: boolean;
}

export const TableCell: FC<ColumnProps> = (props: ColumnProps) => {
    const { keyValue, row, cellContent, tableConfig, checked } = props;
    const checkBoxIcon: ReactNode = (
        <>
            <Icon className={ cn('', { 'selected-row': checked }) } iconPrefix='fas'
                  icon='check-square'/>
        </>
    );

    const cellInlineStyle = {
        width: parseInt(keyValue) === 0 ? 24 : tableConfig.columnWidth
    };

    return (
        <div key={ keyValue } className='cell' style={ cellInlineStyle }>
            { parseInt(keyValue) === 0 && row === 'content' && checkBoxIcon }
            { parseInt(keyValue) !== 0 && <span key={ keyValue } id={ keyValue }>{ cellContent }</span> }
        </div>
    );
};
