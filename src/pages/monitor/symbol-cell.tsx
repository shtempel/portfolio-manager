import React, { FC } from 'react';

import { Button } from '../../components';
import { PortfolioSymbolItem } from '../../store/symbol/typings';

interface CustomCellProps {
    symbol: PortfolioSymbolItem;

    deletePortfolioSymbol(id: string): void;
    addSymbolToChart(id: string): void;
}

export const SymbolCell: FC<CustomCellProps> = (props: CustomCellProps) => {
    return (
        <>
            { props.symbol.name }
            <div className='buttons-row'>
                <Button id={ props.symbol.name }
                        onButtonClick={ (e) => props.addSymbolToChart(e.target.id) }
                        icon={ { iconPrefix: 'fas', iconName: 'chart-line' } }/>
                <Button id={ props.symbol.name }
                        onButtonClick={ (e) => props.deletePortfolioSymbol(e.target.id) }
                        icon={ { iconPrefix: 'fas', iconName: 'trash' } }/>
            </div>
        </>
    );
};
