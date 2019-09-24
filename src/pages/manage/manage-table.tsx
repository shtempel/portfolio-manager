import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import { SymbolSearch, Table, TableConfig } from '../../components';
import { deletePendingSymbol, fetchPortfolioSymbol } from '../../store/symbol/actions';
import {
    selectPendingSymbols,
    selectPortfolio,
    selectTotalPendingBuy,
    selectTotalPendingShares
} from '../../store/symbol/selectors';
import { PendingSymbolItem, PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { footerStyle } from '../inline-styles';
import { SymbolCell } from './symbol-cell';

import 'react-table/react-table.css';
import './manage.scss';

const ManageTable: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();

    const pendingSymbols = useSelector<AppState, PendingSymbolItem[]>(selectPendingSymbols);
    const portfolioSymbols = useSelector<AppState, PortfolioSymbolItem[]>(selectPortfolio);
    const totalPendingShares = useSelector<AppState, string>(selectTotalPendingShares);
    const totalPendingBuy = useSelector<AppState, string>(selectTotalPendingBuy);

    const deletePending = (id: string) => dispatch({ type: getType(deletePendingSymbol), payload: id });
    const fetchPortfolioSymbolItem = (id: string) => dispatch({ type: getType(fetchPortfolioSymbol), payload: id });

    const symbols = pendingSymbols.map((symbol: PendingSymbolItem) => {
        return {
            symbol: <SymbolCell symbol={ symbol }
                                portfolioSymbols={ portfolioSymbols }
                                deletePendingSymbol={ deletePending }
                                fetchSymbol={ fetchPortfolioSymbolItem }/>,
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

export default ManageTable;
