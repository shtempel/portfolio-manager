import cn from 'classnames';
import React, { FC, ReactNode } from 'react';
import { connect } from 'react-redux';
import { IconName } from '@fortawesome/fontawesome-common-types';

import { Button, Icon, Table, TableConfig } from '../../components';
import { deleteRows, deselectAllRows, selectAllRows, selectSymbolRow } from '../../store/symbol/actions';
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
    deleteRows(): void;
}

const mapStateToProps = (state: AppState) => ({
    portfolio: selectPortfolio(state),
    isSomeRowsSelected: selectIsSomeRowsSelected(state),
    selectedRows: selectSelectedRows(state)
});

const mapDispatchToProps = { selectSymbolRow, selectAllRows, deselectAllRows, deleteRows };

const Manage: FC<ManageProps> = (props: ManageProps) => {
    const { isSomeRowsSelected, deselectAllRows, selectAllRows, selectSymbolRow, portfolio, selectedRows, deleteRows } = props;
    const selectDeselect = () => {
        if (!selectedRows || isSomeRowsSelected) {
            selectAllRows();
        }

        if (selectedRows) {
            deselectAllRows();
        }
    };

    const getSelectAllRowsIcon = (): ReactNode => {
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

    const getSelectRowIcon = (checked: boolean, id: string): ReactNode =>
        <Icon className={ cn('', { 'selected-row': checked }) }
              iconPrefix='fas'
              onIconClick={ () => {selectSymbolRow(id)} }
              icon={ checked ? 'check-square' : 'square' }/>;

    const data: any[][] = portfolio.map(item => [
        getSelectRowIcon(item.isChecked, item.symbol),
        item.symbol,
        item.buy,
        item.shares
    ]);

    const deleteSelectedRows = () => isSomeRowsSelected && deleteRows();
    const trashButton: ReactNode = <Button onButtonClick={ deleteSelectedRows }
                                           disabled={ !isSomeRowsSelected }
                                           icon={ { iconName: 'trash', iconPrefix: 'fas' } }/>;
    const footerData = [ trashButton ];

    const tableConfig: TableConfig = {
        tableHeight: 200,
        columnWidth: 100,
        footerData: [ ...footerData ],
        isFooter: true,
        headerData: [ getSelectAllRowsIcon(), 'symbol', 'shares', 'buy' ],
        data: [ ...data ]
    };

    return <><Table tableConfig={ tableConfig }/></>;
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Manage);
