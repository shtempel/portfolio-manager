import React, { CSSProperties, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { SymbolSearch, Table, TableConfig } from '../../components';
import { deletePendingSymbol, fetchPortfolioSymbol } from '../../store/symbol/actions';
import {
    selectIsSymbolFetching,
    selectPendingSymbols,
    selectTotalPendingBuy,
    selectTotalPendingShares
} from '../../store/symbol/selectors';
import { PendingSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { SymbolCell } from './symbol-cell';

import 'react-table/react-table.css';
import './manage.scss';

interface ManageTableProps {
    pendingSymbols: PendingSymbolItem[];
    totalPendingShares: string;
    totalPendingBuy: string;
    isFetching: boolean;

    fetchPortfolioSymbol(id: string): void;
    deletePendingSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state),
    totalPendingShares: selectTotalPendingShares(state),
    totalPendingBuy: selectTotalPendingBuy(state),
    isFetching: selectIsSymbolFetching(state)
});

const mapDispatchToProps = { deletePendingSymbol, fetchPortfolioSymbol };

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { t } = useTranslation();
    const {
        pendingSymbols,
        deletePendingSymbol,
        totalPendingShares,
        totalPendingBuy,
        fetchPortfolioSymbol,
        isFetching
    } = props;

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
                                fetchSymbol={ fetchPortfolioSymbol }
                                isFetching={ isFetching }/>,
            shares: symbol.shares,
            buy: symbol.buy
        }
    });

    const config: TableConfig = {
        data: [ ...symbols ],
        columns: [
            {
                Header: t('symbol'),
                headerClassName: 'header',
                accessor: 'symbol',
                width: 400,
                className: 'symbol-cell',
                Footer: <span style={ footerStyle }>{ t('total') }</span>
            },
            {
                Header: t('shares'),
                headerClassName: 'header',
                accessor: 'shares',
                width: 150,
                className: 'shares-buy-cell',
                Footer: <span style={ footerStyle }>{ totalPendingShares }</span>
            },
            {
                Header: t('buy'),
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
