import React, { FC, ReactNode } from 'react';
import { connect } from 'react-redux';

import { Button, Table, TableConfig } from '../../components';
import { deleteRow } from '../../store/symbol/actions';
import { selectIsSomeRowsSelected, selectPortfolio, selectSelectedRows } from '../../store/symbol/selectors';
import { PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';

interface ManageTableProps {
    isSomeRowsSelected: boolean;
    selectedRows: number;
    portfolio: PortfolioSymbolItem[];

    deleteRow(id: string): void;
}

const mapStateToProps = (state: AppState) => ({
    portfolio: selectPortfolio(state),
    isSomeRowsSelected: selectIsSomeRowsSelected(state),
    selectedRows: selectSelectedRows(state)
});

const mapDispatchToProps = { deleteRow };

const ManageTable: FC<ManageTableProps> = (props: ManageTableProps) => {
    const { portfolio, deleteRow } = props;

    const getFirstColumn = (id: string): ReactNode =>
        <Button onButtonClick={ onDeleteRow } id={ id } icon={ { iconPrefix: 'fas', iconName: 'trash' } }/>;

    const onDeleteRow = (e: any) => deleteRow(e.target.id);

    const settingsButton: ReactNode = <Button icon={ { iconPrefix: 'fas', iconName: 'cog' } }/>;

    const data: any[][] = portfolio.map(item => [
        getFirstColumn(item.symbol),
        item.symbol,
        item.buy,
        item.shares
    ]);

    const tableConfig: TableConfig = {
        tableHeight: 200,
        columnWidth: 100,
        headerData: [ settingsButton, 'symbol', 'shares', 'buy' ],
        data: [ ...data ]
    };

    return <Table tableConfig={ tableConfig }/>
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTable);
