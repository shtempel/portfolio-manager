import React, { FC } from 'react';

import ReactTable, { Column } from 'react-table';

import './table.scss';

export interface TableConfig {
    columns: Column[];
    data: any[];
    tableHeight?: number;
    height?: number
    defaultPageSize?: number;
    showPagination?: boolean;
    resizable?: boolean;
    sortable?: boolean;
}

interface TableProps {
    config: TableConfig;
}

export const Table: FC<TableProps> = (props: TableProps) =>
    <ReactTable style={ { height: `${ props.config.height }px` } }
                className='table -highlight'
                resizable={ props.config.resizable = false }
                sortable={ props.config.sortable = false }
                data={ props.config.data }
                columns={ props.config.columns }
                showPagination={ props.config.showPagination = false }/>;
