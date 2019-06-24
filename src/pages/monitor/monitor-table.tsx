import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Button, Table, TableConfig } from '../../components';
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
    const buttonsBar = (symbol: any) => (
        <div>
            { symbol.name } <Button icon={ { iconPrefix: 'fas', iconName: 'trash' } }/>
        </div>
    );
    const symbols = portfolio.map((symbol: PortfolioSymbolItem) => {
        return {
            symbol: buttonsBar(symbol),
            shares: symbol.shares,
            buy: symbol.buy,
            current: symbol.currentValue
        }
    });

    const config: TableConfig = {
        data: [...symbols],
        columns: [
            { Header: t('table.symbol'), accessor: 'symbol', width: 400, headerClassName: 'header' },
            { Header: t('table.shares'), accessor: 'shares', width: 200, headerClassName: 'header' },
            { Header: t('table.buy'), accessor: 'buy', width: 100, headerClassName: 'header' },
            { Header: t('table.current'), accessor: 'current', width: 100, headerClassName: 'header' },
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
