import React, { CSSProperties, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { SymbolSearch, Table, TableConfig } from '../../components';
import { deletePendingSymbol, fetchSymbol } from '../../store/symbol/actions';
import { selectPendingSymbols, selectTotalPendingBuy, selectTotalPendingShares } from '../../store/symbol/selectors';
import { PendingSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { SymbolCell } from './symbol-cell';

import 'react-table/react-table.css';
import './manage.scss';

interface ManageTableProps {
    pendingSymbols: PendingSymbolItem[];
    totalPendingShares: string;
    totalPendingBuy: string;

    fetchSymbol(id: string): void;
    deletePendingSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state),
    totalPendingShares: selectTotalPendingShares(state),
    totalPendingBuy: selectTotalPendingBuy(state)
});

const mapDispatchToProps = { deletePendingSymbol, fetchSymbol };

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { t } = useTranslation();
    const { pendingSymbols, deletePendingSymbol, totalPendingShares, totalPendingBuy, fetchSymbol } = props;
    const footerStyle: CSSProperties = {
        display: 'flex',
        height: '10%',
        fontWeight: 'bold',
        fontSize: '14px',
        justifyContent: 'center',
        color: '#8A8A96',
        backgroundColor: '#FAFBFC'
    };
    const symbols = pendingSymbols.map((symbol: PendingSymbolItem) => {
        return {
            symbol: <SymbolCell symbol={ symbol }
                                deletePendingSymbol={ deletePendingSymbol }
                                fetchSymbol={ fetchSymbol }/>,
            shares: symbol.shares,
            buy: symbol.buy
        }
    });

    const config: TableConfig = {
        data: [ ...symbols ],
        columns: [
            {
                Header: t('table.symbol'),
                headerClassName: 'header',
                accessor: 'symbol',
                width: 400,
                className: 'symbol-cell',
                Footer: <span style={ footerStyle }>{ t('tableFooter.total') }</span>
            },
            {
                Header: t('table.shares'),
                headerClassName: 'header',
                accessor: 'shares',
                width: 150,
                className: 'shares-buy-cell',
                Footer: <span style={ footerStyle }>{ totalPendingShares }</span>
            },
            {
                Header: t('table.buy'),
                headerClassName: 'header',
                accessor: 'buy',
                width: 150,
                className: 'shares-buy-cell',
                Footer: <span style={ footerStyle }>{ totalPendingBuy }</span>
            },
            { Header: '' }
        ],
        height: 600
    };

    return (
        <>
            <Table config={ config }/>
            <SymbolSearch/>
        </>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTable);
