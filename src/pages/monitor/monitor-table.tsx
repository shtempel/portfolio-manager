import { push } from 'connected-react-router';
import React, { memo, FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

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

interface MonitorTableProps {
    portfolio: PortfolioSymbolItem[];
    currentTotal: string;
    portfolioTotalBuy: string;
    portfolioTotalShares: string;
    isPortfolioAvailable: boolean;

    push(path: string): void;
    deletePortfolioSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    portfolio: selectPortfolio(state),
    currentTotal: selectPortfolioTotalCurrent(state),
    portfolioTotalBuy: selectPortfolioTotalBuy(state),
    portfolioTotalShares: selectPortfolioTotalShares(state),
    isPortfolioAvailable: selectIsPortfolioAvailable(state)
});

const mapDispatchToProps = { deletePortfolioSymbol, push };

export const MonitorTable: FC<MonitorTableProps> = (props: MonitorTableProps) => {
    const { t } = useTranslation();
    const {
        portfolio,
        deletePortfolioSymbol,
        currentTotal,
        portfolioTotalBuy,
        portfolioTotalShares,
        isPortfolioAvailable,
        push
    } = props;
    const initialChartDataState: ChartDataState[] = portfolio.length
        ? [ {
            name: portfolio[ 0 ].name,
            data: portfolio[ 0 ].history
        } ]
        : [];

    useEffect(() => { !isPortfolioAvailable && push(ROUTES.manage) });
    const [ chartData, setChartData ] = useState<ChartDataState[]>(initialChartDataState);

    const symbolToChart = (id: string) => {
        const selected = portfolio.filter(item => item.name === id).map(item => ({
            name: item.name,
            data: [ ...item.history ]
    }));
        setChartData(selected);
    };

    const symbols = portfolio.map((symbol: PortfolioSymbolItem) => {
        return {
            symbol: <SymbolCell symbol={ symbol }
                                addSymbolToChart={ symbolToChart }
                                deletePortfolioSymbol={ deletePortfolioSymbol }/>,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(MonitorTable));
