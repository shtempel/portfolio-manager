import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Table, TableConfig } from '../../components';
import { deletePortfolioSymbol } from '../../store/symbol/actions';
import { selectPortfolio } from '../../store/symbol/selectors';
import { PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { SymbolCell } from './symbol-cell';

interface MonitorTableProps {
    portfolio: PortfolioSymbolItem[];

    deletePortfolioSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    portfolio: selectPortfolio(state)
});

const mapDispatchToProps = { deletePortfolioSymbol };

export const MonitorTable: FC<MonitorTableProps> = (props: MonitorTableProps) => {
    const { t } = useTranslation();
    const { portfolio, deletePortfolioSymbol } = props;
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
                className: 'symbol-cell'
            },
            {
                Header: t('shares'),
                accessor: 'shares',
                width: 200,
                headerClassName: 'header',
                className: 'shares-buy-cell'
            },
            {
                Header: t('buy'),
                accessor: 'buy',
                width: 100,
                headerClassName: 'header',
                className: 'shares-buy-cell'
            },
            {
                Header: t('current'),
                accessor: 'current',
                width: 100,
                headerClassName: 'header',
                className: 'shares-buy-cell'
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
)(MonitorTable);
