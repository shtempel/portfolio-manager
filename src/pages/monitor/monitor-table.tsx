import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Table, TableConfig } from '../../components';
import { selectPortfolio } from '../../store/symbol/selectors';
import { PortfolioSymbolItem } from '../../store/symbol/typings';

import { AppState } from '../../store/typings';

interface MonitorTableProps {
    portfolio: PortfolioSymbolItem[];
}

const mapStateToProps = (state: AppState) => ({
    portfolio: selectPortfolio(state)
});

const mapDispatchToProps = {};

export const MonitorTable: FC<MonitorTableProps> = (props: MonitorTableProps) => {
    const { t } = useTranslation();
    const { portfolio } = props;
    const symbols = portfolio.map((symbol: PortfolioSymbolItem) => {
        return {
            symbol: symbol.name,
            shares: symbol.shares,
            buy: symbol.buy,
            current: symbol.currentValue
        }
    });
    const config: TableConfig = {
        data: [ ...symbols ],
        columns: [
            { Header: t('table.symbol'), accessor: 'symbol', width: 400, headerClassName: 'header' },
            { Header: t('table.shares'), accessor: 'shares', width: 200, headerClassName: 'header' },
            { Header: t('table.buy'), accessor: 'buy', minWidth: 50, headerClassName: 'header' },
            { Header: t('table.current'), accessor: 'current', minWidth: 50, headerClassName: 'header' },
            { Header: '' }
        ],
        height: 300
    };

    return <Table config={ config }/>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonitorTable);
