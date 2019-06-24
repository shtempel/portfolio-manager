import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Table, TableConfig } from '../../components';
import { selectPendingSymbols } from '../../store/symbol/selectors';
import { PendingSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';

import 'react-table/react-table.css';

interface ManageTableProps {
    pendingSymbols: PendingSymbolItem[];
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state)
});

const mapDispatchToProps = {};

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { t } = useTranslation();
    const { pendingSymbols } = props;
    const symbols = pendingSymbols.map((symbol: PendingSymbolItem) => {
        return {
            symbol: symbol.symbol,
            shares: symbol.shares,
            buy: symbol.buy
        }
    });
    const config: TableConfig = {
        data: [ ...symbols ],
        columns: [
            { Header: t('table.symbol'), accessor: 'symbol', width: 400, headerClassName: 'header' },
            { Header: t('table.shares'), accessor: 'shares', minWidth: 100, headerClassName: 'header' },
            { Header: t('table.buy'), accessor: 'buy', minWidth: 50, headerClassName: 'header' },
            { Header: '' }
        ],
        height: 300
    };

    return <Table config={ config }/>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTable);
