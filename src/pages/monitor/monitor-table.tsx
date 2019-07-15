import React, { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Table, TableConfig } from '../../components';
import { deletePortfolioSymbol } from '../../store/symbol/actions';
import {
    selectPortfolio,
    selectPortfolioTotalBuy,
    selectPortfolioTotalCurrent,
    selectPortfolioTotalShares
} from '../../store/symbol/selectors';
import { PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { footerStyle } from '../inline-styles';
import { SymbolCell } from './symbol-cell';

interface MonitorTableProps {
    portfolio: PortfolioSymbolItem[];
    currentTotal: string;
    portfolioTotalBuy: string;
    portfolioTotalShares: string;

    deletePortfolioSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    portfolio: selectPortfolio(state),
    currentTotal: selectPortfolioTotalCurrent(state),
    portfolioTotalBuy: selectPortfolioTotalBuy(state),
    portfolioTotalShares: selectPortfolioTotalShares(state)
});

const mapDispatchToProps = { deletePortfolioSymbol };

export const MonitorTable: FC<MonitorTableProps> = (props: MonitorTableProps) => {
    const { t } = useTranslation();
    const { portfolio, deletePortfolioSymbol, currentTotal, portfolioTotalBuy, portfolioTotalShares } = props;
    const symbols = portfolio.map((symbol: PortfolioSymbolItem) => {
        return {
            symbol: <SymbolCell symbol={ symbol }
                                addSymbolToChart={ deletePortfolioSymbol }
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

    return <Table config={ config }/>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(MonitorTable));
