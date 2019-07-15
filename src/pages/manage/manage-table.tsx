import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { SymbolSearch, Table, TableConfig } from '../../components';
import { deletePendingSymbol, fetchPortfolioSymbol } from '../../store/symbol/actions';
import {
    selectPendingSymbols, selectPortfolio,
    selectTotalPendingBuy,
    selectTotalPendingShares
} from '../../store/symbol/selectors';
import { PendingSymbolItem, PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { footerStyle } from '../inline-styles';
import { SymbolCell } from './symbol-cell';

import 'react-table/react-table.css';
import './manage.scss';

interface ManageTableProps {
    pendingSymbols: PendingSymbolItem[];
    portfolioSymbols: PortfolioSymbolItem[];
    totalPendingShares: string;
    totalPendingBuy: string;

    fetchPortfolioSymbol(id: string): void;
    deletePendingSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state),
    portfolioSymbols: selectPortfolio(state),
    totalPendingShares: selectTotalPendingShares(state),
    totalPendingBuy: selectTotalPendingBuy(state)
});

const mapDispatchToProps = { deletePendingSymbol, fetchPortfolioSymbol };

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { t } = useTranslation();
    const {
        pendingSymbols,
        portfolioSymbols,
        deletePendingSymbol,
        totalPendingShares,
        totalPendingBuy,
        fetchPortfolioSymbol,
    } = props;

    const symbols = pendingSymbols.map((symbol: PendingSymbolItem) => {
        return {
            symbol: <SymbolCell symbol={ symbol }
                                portfolioSymbols={portfolioSymbols}
                                deletePendingSymbol={ deletePendingSymbol }
                                fetchSymbol={ fetchPortfolioSymbol }/>,
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
