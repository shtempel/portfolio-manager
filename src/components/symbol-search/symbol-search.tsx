import React, { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Button, Icon } from '..';
import { addPendingSymbol } from '../../store/symbol/actions';
import { PendingSymbolItem } from '../../store/symbol/typings';
import { symbolService } from '../../services';
import { symbolsSearchMapper } from '../../common/mappers/symbol-mappers';
import { SearchResult } from '../../services/typings';

import './symbol-search.scss';

interface SymbolSearchProps {
    addPendingSymbol(symbol: PendingSymbolItem): void;
}

const mapDispatchToProps = {
    addPendingSymbol
};

export const SymbolSearch: FC<SymbolSearchProps> = (props: SymbolSearchProps) => {
    const { t } = useTranslation();
    const { addPendingSymbol } = props;
    const [ searchResult, setSearchResult ] = useState<SearchResult[]>([]);
    const [ pendingSymbol, setPendingSymbol ] = useState<string>('');
    const [ addSymbolMode, setAddSymbolMode ] = useState<boolean>(false);
    const [ sharesBuy, setSharesBuy ] = useState<{ shares: string, buy: string }>({ shares: '', buy: '' });
    const isAddAvailable: boolean = sharesBuy.shares === '' || sharesBuy.buy === '';

    const fetchSymbolsList = (e: React.FormEvent<HTMLInputElement>) => {
        if ( e.currentTarget.value.length > 1 ) {
            symbolService.symbolSearch(e.currentTarget.value)
                .then(res => setSearchResult(symbolsSearchMapper(res)))
        }
    };

    const startEditMode = (e: any) => {
        setPendingSymbol(e.target.parentNode.id);
        setAddSymbolMode(true);
    };

    const addSymbol = () => {
        addPendingSymbol({ symbol: pendingSymbol.toLowerCase(), description: '', ...sharesBuy });
        setSearchResult([]);
        setAddSymbolMode(false);
    };

    const cancelAddSymbolMode = () => {
        setAddSymbolMode(false);
        setSearchResult([]);
    };

    const addSymbolInput: ReactNode = (
        <div>
            <input type='text' placeholder={ pendingSymbol && pendingSymbol }/>
            <Icon className='cancel-save' icon='times' iconPrefix='fa' onIconClick={ cancelAddSymbolMode }/>
        </div>
    );

    const searchResultList: ReactNode = (
        <div className='search-result-list'>
            {
                searchResult.map((result: SearchResult) => (
                    <div className='search-result-list__item'
                         key={ result.symbol } id={ result.symbol }>
                        <span
                            onClick={ startEditMode }>
                            { result.symbol }
                        </span>
                        <span onClick={ startEditMode }>  { result.description }</span>
                    </div>
                ))
            }
        </div>
    );

    const searchInput: ReactNode = addSymbolMode
        ? addSymbolInput
        : <input onChange={ fetchSymbolsList } type='text' placeholder={ t('searchPlaceholder') }/>;

    const getSharesBuyNodes = (type: 'shares' | 'buy'): ReactNode => {
        const addFunc = type === 'shares'
            ? (e: React.FormEvent<HTMLInputElement>) =>
                setSharesBuy({ shares: e.currentTarget.value, buy: sharesBuy.buy })
            : (e: React.FormEvent<HTMLInputElement>) =>
                setSharesBuy({ shares: sharesBuy.shares, buy: e.currentTarget.value });
        return (
            <input placeholder={ t(`${ type }Placeholder`) }
                   className='shares-buy-input'
                   type='number'
                   onChange={ addFunc }/>
        )
    };

    const totalControls: ReactNode = (
        <div className='total-controls'>
            <Button name='add' onButtonClick={ addSymbol } disabled={ isAddAvailable }/>
            <Button name='cancel' onButtonClick={ cancelAddSymbolMode }/>
        </div>
    );

    return (
        <div className='total-row'>
            { searchInput }
            { (!addSymbolMode && searchResult.length > 0) && searchResultList }
            { addSymbolMode && getSharesBuyNodes('shares') }
            { addSymbolMode && getSharesBuyNodes('buy') }
            { addSymbolMode && totalControls }
        </div>
    );
};

export default connect(
    null,
    mapDispatchToProps
)(SymbolSearch);
