import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Table, TableConfig, TotalRow } from '../../components';
import { deletePendingSymbol } from '../../store/symbol/actions';
import { selectPendingSymbols } from '../../store/symbol/selectors';
import { PendingSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';
import { SymbolCell } from './symbol-cell';

import 'react-table/react-table.css';
import './manage.scss';

interface ManageTableProps {
    pendingSymbols: PendingSymbolItem[];

    deletePendingSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state)
});

const mapDispatchToProps = { deletePendingSymbol };

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { t } = useTranslation();
    const { pendingSymbols, deletePendingSymbol } = props;

    const symbols = pendingSymbols.map((symbol: PendingSymbolItem) => {
        return {
            symbol: <SymbolCell symbol={ symbol } deletePendingSymbol={ deletePendingSymbol }/>,
            shares: symbol.shares,
            buy: symbol.buy
        }
    });

    const config: TableConfig = {
        data: [ ...symbols ],
        columns: [
            {
                Header: t('table.symbol'),
                accessor: 'symbol',
                width: 400,
                headerClassName: 'header',
                className: 'symbol-cell'
            },
            { Header: t('table.shares'), accessor: 'shares', width: 150, headerClassName: 'header' },
            { Header: t('table.buy'), accessor: 'buy', width: 150, headerClassName: 'header' },
            { Header: '' }
        ],
        height: 300
    };

    return <>
        <Table config={ config }/>
        <TotalRow/>
    </>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTable);
