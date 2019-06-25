import React, { CSSProperties, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Table, TableConfig, TableFooter } from '../../components';
import { deletePendingSymbol } from '../../store/symbol/actions';
import { selectPendingSymbols } from '../../store/symbol/selectors';
import { PendingSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { SymbolCell } from './symbol-cell';

import 'react-table/react-table.css';
import './manage.scss';

interface ManageTableProps {
    pendingSymbols: PendingSymbolItem[];

    deletePendingSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state)
});

const mapDispatchToProps = { deletePendingSymbol };

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { t } = useTranslation();
    const { pendingSymbols, deletePendingSymbol } = props;
    const footerStyle: CSSProperties = {
        height: '10%',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#8A8A96',
        backgroundColor: '#FAFBFC'
    };
    const symbols = pendingSymbols.map((symbol: PendingSymbolItem) => {
        return {
            symbol: <SymbolCell symbol={ symbol } deletePendingSymbol={ deletePendingSymbol }/>,
            shares: symbol.shares,
            buy: symbol.buy
        }
    });

    const config: TableConfig = {
        data: [ ...symbols ],
        columns: [
            {
                Header: t('table.symbol'),
                Footer: <span style={ footerStyle }>{ t('tableFooter.total') }</span>,
                headerClassName: 'header',
                accessor: 'symbol',
                width: 400,
                className: 'symbol-cell'
            },
            { Header: t('table.shares'), accessor: 'shares', width: 150, headerClassName: 'header' },
            { Header: t('table.buy'), accessor: 'buy', width: 150, headerClassName: 'header' },
            { Header: '' }
        ],
        height: 300
    };

    return (
        <>
            <Table config={ config }/>
            <TableFooter/>
        </>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTable);
