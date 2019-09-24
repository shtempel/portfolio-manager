import React, { FC, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';

import { Table, TableConfig, Chart } from '../../components';
import { ROUTES } from '../../routes';
import { deletePortfolioSymbol } from '../../store/symbol/actions';
import {
    selectIsPortfolioAvailable,
    selectPortfolio,
    selectPortfolioTotalBuy,
    selectPortfolioTotalCurrent,
    selectPortfolioTotalShares
} from '../../store/symbol/selectors';
import { PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { footerStyle } from '../inline-styles';
import { SymbolCell } from './symbol-cell';
import { ChartDataState } from './typings';

const MonitorTable: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();

    const portfolio = useSelector<AppState, PortfolioSymbolItem[]>(selectPortfolio);
    const currentTotal = useSelector<AppState, string>(selectPortfolioTotalCurrent);
    const portfolioTotalBuy = useSelector<AppState, string>(selectPortfolioTotalBuy);
    const portfolioTotalShares = useSelector<AppState, string>(selectPortfolioTotalShares);
    const isPortfolioAvailable = useSelector<AppState, boolean>(selectIsPortfolioAvailable);

    const deleteSymbolFromPortfolio = (id: string): void => {
        dispatch({
            type: getType(deletePortfolioSymbol),
            payload: id
        })
    };

    const navigate = (pathname: string) => {
        dispatch({
            type: '@@router/LOCATION_CHANGE',
            payload: {
                location: { pathname: pathname },
                action: 'POP'
            }
        })
    };

    const initialChartDataState: ChartDataState[] = portfolio.length
        ? [ { name: portfolio[ 0 ].name, data: portfolio[ 0 ].history } ]
        : [];

    useEffect(() => { !isPortfolioAvailable && navigate(ROUTES.manage) });
    const [ chartData, setChartData ] = useState<ChartDataState[]>(initialChartDataState);

    const symbolToChart = (id: string) => {
        const selected = portfolio.filter(item => item.name === id).map(item => ({
            name: item.name,
            data: [ ...item.history ]
        }));
        setChartData(selected);
    };

    const symbols = portfolio.map((symbol: PortfolioSymbolItem): ReactNode => {
        return {
            symbol: <SymbolCell symbol={ symbol }
                                addSymbolToChart={ symbolToChart }
                                deletePortfolioSymbol={ deleteSymbolFromPortfolio }/>,
            shares: symbol.shares,
            buy: symbol.buy,
            current: symbol.currentValue
        }
    });

    const config: TableConfig = {
        data: [ ...symbols ],
        columns: [
            {
                Header: t('symbol'),
                accessor: 'symbol',
                width: 400,
                headerClassName: 'header',
                className: 'symbol-cell',
                Footer: <span style={ footerStyle }>{ t('total') }</span>
            },
            {
                Header: t('shares'),
                accessor: 'shares',
                width: 200,
                headerClassName: 'header',
                className: 'shares-buy-cell',
                Footer: <span style={ footerStyle }>{ portfolioTotalShares }</span>
            },
            {
                Header: t('buy'),
                accessor: 'buy',
                width: 100,
                headerClassName: 'header',
                className: 'shares-buy-cell',
                Footer: <span style={ footerStyle }>{ portfolioTotalBuy }</span>
            },
            {
                Header: t('current'),
                accessor: 'current',
                width: 100,
                headerClassName: 'header',
                className: 'shares-buy-cell',
                Footer: <span style={ footerStyle }>{ currentTotal }</span>
            },
            { Header: '' }
        ],
        height: 300,
    };

    return (
        <>
            <Chart chartName={ t('chartTitle') } chartType='line' series={ chartData }/>
            <Table config={ config }/>
        </>
    )
};

export default MonitorTable;
