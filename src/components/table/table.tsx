import React, { FC, ReactNode } from 'react';

import { TableCell } from './table-cell/table-cell';

import './table.scss';

export interface TableConfig {
    columnWidth: number;
    tableHeight: number;
    headerData: any[];
    footerData?: any[];
    data: any[][];
    isHeader?: boolean;
    isFooter?: boolean;
}

interface TableProps {
    tableConfig: TableConfig;
}

export const Table: FC<TableProps> = (props: TableProps) => {
    const { tableConfig } = props;
    const { isHeader = true, isFooter, data, tableHeight, headerData, footerData } = tableConfig;
    const getContentHeight = () => {
        if (isHeader && isFooter) {
            return '80%'
        } else if ((isHeader && !isFooter) || (!isHeader && isFooter)) {
            return '90%'
        }

        return '100%'
    };

    const tableInlineStyles = {
        height: tableHeight
    };

    const contentInlineStyles = {
        height: getContentHeight()
    };

    const headerStyles = {
        height: isFooter ? '10%' : '20%'
    };

    const tableRows = (): ReactNode => {
        const header: ReactNode = isHeader && (
            <div id='header-id' className='row header' style={ headerStyles }>
                {
                    headerData.map((headerData, index) =>
                        <TableCell key={ index.toString() }
                                   keyValue={ index.toString() }
                                   cellContent={ headerData }
                                   tableConfig={ tableConfig }/>)
                }
            </div>
        );

        const content: ReactNode = (
            <div id='scrolling' className='content' style={ contentInlineStyles }>
                {
                    data.map((data, index) => {
                        return <div className='row' key={ index } id={ data[1] }>
                            {
                                data.map((dataItem, index) =>
                                    <TableCell key={ index.toString() }
                                               keyValue={ index.toString() }
                                               cellContentAlign={ index === 1 ? 'start' : 'end' }
                                               cellContent={ dataItem }
                                               tableConfig={ tableConfig }/>)
                            }
                        </div>;
                    })
                }
            </div>
        );
        const footer: ReactNode = isFooter && (
            <div className='footer'>
                {
                    footerData && footerData.map(footerItem => footerItem)
                }
            </div>
        );

        return (
            <>
                { header }
                { content }
                { footer }
            </>
        );
    };

    return <div className='table' style={ tableInlineStyles }>{ tableRows() }</div>;
};
