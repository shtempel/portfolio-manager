import React, { FC } from 'react';

import { Button } from '../../components';
import { PendingSymbolItem, PortfolioSymbolItem } from '../../store/symbol/typings';

interface CustomCellProps {
    symbol: PendingSymbolItem;
    portfolioSymbols: PortfolioSymbolItem[];

    deletePendingSymbol(id: string): void;
    fetchSymbol(id: string): void;
}

export const SymbolCell: FC<CustomCellProps> = (props: CustomCellProps) => {
    const isSymbolInPortfolio = (symbolName: string): boolean => props.portfolioSymbols.some(item => item.name === symbolName);
    const isFetchIsAvailable: boolean = !isSymbolInPortfolio(props.symbol.symbol);

    return (
        <>
            { props.symbol.symbol }
            <div className='buttons-row'>
                <Button id={ props.symbol.symbol }
                        disabled={ !isFetchIsAvailable }
                        onButtonClick={ (e) => isFetchIsAvailable && props.fetchSymbol(e.target.id) }
                        icon={ { iconPrefix: 'fas', iconName: 'briefcase' } }/>
                <Button id={ props.symbol.symbol }
                        onButtonClick={ (e) => props.deletePendingSymbol(e.target.id) }
                        icon={ { iconPrefix: 'fas', iconName: 'trash' } }/>
            </div>
        </>
    );
};
