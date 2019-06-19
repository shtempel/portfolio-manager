import React, { FC, ReactNode } from 'react';

import { TableCell } from './table-cell/table-cell';

import './table.scss';

export interface TableConfig {
    columnWidth: number;
    tableHeight: number;
    headerData: any[];
    data: any[][];
}

interface TableProps {
    tableConfig: TableConfig;

    selectSymbolRow(id: string): void;
}

export const Table: FC<TableProps> = (props: TableProps) => {
    const tableInlineStyles = {
        height: props.tableConfig.tableHeight
    };

    const tableRows = (): ReactNode => {
        return (
            <>
                <div id='header-id' className='row header'>
                    {
                        props.tableConfig.headerData.map((headerData, index) =>
                            <TableCell key={ index.toString() }
                                       keyValue={ index.toString() }
                                       cellContent={ headerData }
                                       tableConfig={ props.tableConfig }/>)
                    }
                </div>
                <div id='content-id' className='content'>
                    {
                        props.tableConfig.data.map((data, index) => {
                            return <div className='row' key={ index } id={ data[1] }>
                                {
                                    data.map((dataItem, index) =>
                                        <TableCell key={ index.toString() }
                                                   keyValue={ index.toString() }
                                                   cellContent={ dataItem }
                                                   tableConfig={ props.tableConfig }/>)
                                }
                            </div>;
                        })
                    }
                </div>
            </>
        );
    };

    return <div id='scrolling' className='table' style={ tableInlineStyles }>{ tableRows() }</div>;
};
