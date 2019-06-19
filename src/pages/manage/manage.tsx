import cn from 'classnames';
import React, { FC, ReactNode } from 'react';
import { connect } from 'react-redux';
import { IconName } from '@fortawesome/fontawesome-common-types';

import { Icon, Table, TableConfig } from '../../components';
import { deselectAllRows, selectAllRows, selectSymbolRow } from '../../store/symbol/actions';
import { selectIsSomeRowsSelected, selectPortfolio, selectSelectedRows } from '../../store/symbol/selectors';
import { PortfolioSymbolItem } from '../../store/symbol/typings';
import { AppState } from '../../store/typings';

interface ManageProps {
    portfolio: PortfolioSymbolItem[];
    isSomeRowsSelected: boolean;
    selectedRows: number;

    selectSymbolRow(id: string): void;
    selectAllRows(): void;
    deselectAllRows(): void;
}

const mapStateToProps = (state: AppState) => ({
    portfolio: selectPortfolio(state),
    isSomeRowsSelected: selectIsSomeRowsSelected(state),
    selectedRows: selectSelectedRows(state)
});

const mapDispatchToProps = { selectSymbolRow, selectAllRows, deselectAllRows };

const Manage: FC<ManageProps> = (props: ManageProps) => {
    const { isSomeRowsSelected, deselectAllRows, selectAllRows, selectSymbolRow, portfolio, selectedRows } = props;
    const selectDeselect = () => {
        if (!selectedRows || isSomeRowsSelected) {
            selectAllRows();
        }

        if (selectedRows) {
            deselectAllRows();
        }
    };

    const getAllCheckUncheckIcon = (): ReactNode => {
        let iconType: IconName = 'square';
        if (isSomeRowsSelected) {
            iconType = 'minus-square';

            if (selectedRows === portfolio.length) {
                iconType = 'check-square';
            }
        }

        return (
            <Icon className={ cn('', { 'selected-row': isSomeRowsSelected }) }
                  iconPrefix='fas'
                  onIconClick={ selectDeselect }
                  icon={ iconType }/>
        )
    };

    const getCheckedIcon = (checked: boolean, id: string): ReactNode =>
        <Icon className={ cn('', { 'selected-row': checked }) }
              iconPrefix='fas'
              onIconClick={ () => {selectSymbolRow(id)} }
              icon={ checked ? 'check-square' : 'square' }/>;

    const data: any[][] = portfolio.map(item => [
        getCheckedIcon(item.isChecked, item.symbol),
        item.symbol,
        item.buy,
        item.shares
    ]);

    const tableConfig: TableConfig = {
        tableHeight: 200,
        columnWidth: 100,
        headerData: [ getAllCheckUncheckIcon(), 'symbol', 'shares', 'buy' ],
        data: [ ...data ]
    };

    return <Table tableConfig={ tableConfig } selectSymbolRow={ selectSymbolRow }/>;
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Manage);
