import React, { FC } from 'react';

import { Button } from '../../components';
import { PendingSymbolItem } from '../../store/symbol/typings';

interface CustomCellProps {
    symbol: PendingSymbolItem;
    isFetching: boolean;

    deletePendingSymbol(id: string): void;
    fetchSymbol(id: string): void;
}

export const SymbolCell: FC<CustomCellProps> = (props: CustomCellProps) => {
    return (
        <>
            { props.symbol.symbol }
            <div className='buttons-row'>
                <Button id={ props.symbol.symbol }
                        disabled={ props.isFetching }
                        onButtonClick={ (e) => !props.isFetching && props.fetchSymbol(e.target.id) }
                        icon={ { iconPrefix: 'fas', iconName: 'briefcase' } }/>
                <Button id={ props.symbol.symbol }
                        onButtonClick={ (e) => props.deletePendingSymbol(e.target.id) }
                        icon={ { iconPrefix: 'fas', iconName: 'trash' } }/>
            </div>
        </>
    );
};
