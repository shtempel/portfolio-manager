import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import './table.scss';
import { Icon } from '..';

export interface TableConfig {
    columnWidth: number;
    tableHeight: number;
    headerData: string[];
    data: string[][];
}

interface TableProps {
    tableConfig: TableConfig;
}

export const Table: FC<TableProps> = (props: TableProps) => {

    const checkBoxIcon: ReactNode = (
        <>
            <Icon iconPrefix='fas' icon='square-full'/>
            <Icon iconPrefix='fas' icon='check-square'/>
        </>
    );

    const selectRow = (e: any) => {
        console.log('div clicked');
    };

    const cellInlineStyle = {
        width: props.tableConfig.columnWidth
    };

    const tableInlineStyles = {
        height: props.tableConfig.tableHeight
    };

    const tableRows = (): ReactNode => {
        return (
            <>
                <div id='header-id' className='row header'>
                    { props.tableConfig.headerData.map((headerData, index) => tableCell(headerData, index.toString())) }
                </div>
                <div id='content-id' className='content'>
                    {
                        props.tableConfig.data.map((data, index) => {
                            return <div className='row' onClick={ selectRow } key={ index }
                                        id={ index.toString() }>
                                { data.map((dataItem, index) => tableCell(dataItem, index.toString())) }
                            </div>;
                        })
                    }
                </div>
            </>
        );
    };

    const tableCell = (cellContent: string, key: string): ReactNode =>
        <div key={ key } className='cell' style={ cellInlineStyle }>
            { parseInt(key) === 0 && checkBoxIcon }
            { parseInt(key) !== 0 && <span key={ key } id={ key }>{ cellContent }</span> }
        </div>;

    return <div id='scrolling' className='table' style={ tableInlineStyles }>{ tableRows() }</div>;
};
