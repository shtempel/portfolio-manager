import React, { FC, ReactNode } from 'react';
import { connect } from 'react-redux';

import { Button, Table, TableConfig } from '../../components';
import { deletePendingSymbol } from '../../store/symbol/actions';
import { selectIsSomeRowsSelected, selectPendingSymbols, selectSelectedRows } from '../../store/symbol/selectors';
import { PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';

interface ManageTableProps {
    isSomeRowsSelected: boolean;
    selectedRows: number;
    pendingSymbols: PortfolioSymbolItem[];

    deletePendingSymbol(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state),
    isSomeRowsSelected: selectIsSomeRowsSelected(state),
    selectedRows: selectSelectedRows(state)
});

const mapDispatchToProps = { deletePendingSymbol };

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { pendingSymbols, deletePendingSymbol } = props;

    const getFirstColumn = (id: string): ReactNode =>
        <Button onButtonClick={ onDeleteRow } id={ id } icon={ { iconPrefix: 'fas', iconName: 'trash' } }/>;

    const onDeleteRow = (e: any) => deletePendingSymbol(e.target.id);

    const settingsButton: ReactNode = <Button icon={ { iconPrefix: 'fas', iconName: 'cog' } }/>;

    const data: any[][] = pendingSymbols.map(item => [
        getFirstColumn(item.symbol),
        item.symbol,
        item.buy,
        item.shares
    ]);

    const tableConfig: TableConfig = {
        tableHeight: 200,
        columnWidth: 400,
        headerData: [settingsButton, 'symbol', 'shares', 'buy'],
        data: [...data]
    };

    return <Table tableConfig={ tableConfig }/>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTable);
