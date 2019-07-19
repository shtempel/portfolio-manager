import React, { memo, FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Button, Icon } from '..';
import { addError } from '../../store/errors/actions';
import { AppErrorType } from '../../store/errors/typings';
import { addPendingSymbol, searchSymbolFail } from '../../store/symbol/actions';
import { selectPendingSymbols } from '../../store/symbol/selectors';
import { PendingSymbolItem } from '../../store/symbol/typings';
import { symbolService } from '../../services';
import { symbolsSearchMapper } from '../../common/mappers/symbol-mappers';
import { SearchResult } from '../../services/typings';
import { AppState } from '../../store/typings';

import './symbol-search.scss';

interface SymbolSearchProps {
    pendingSymbols: PendingSymbolItem[];

    addPendingSymbol(symbol: PendingSymbolItem): void;
    searchSymbolFail(): void;
    addError(error: AppErrorType): void;
}

const mapStateToProps = (state: AppState) => ({
    pendingSymbols: selectPendingSymbols(state)
});

const mapDispatchToProps = {
    addPendingSymbol,
    searchSymbolFail,
    addError
};

export const SymbolSearch: FC<SymbolSearchProps> = (props: SymbolSearchProps) => {
    const { t } = useTranslation();
    const { addPendingSymbol, pendingSymbols, searchSymbolFail, addError } = props;
    const [ searchResult, setSearchResult ] = useState<SearchResult[]>([]);
    const [ pendingSymbol, setPendingSymbol ] = useState<string>('');
    const [ addSymbolMode, setAddSymbolMode ] = useState<boolean>(false);
    const [ sharesBuy, setSharesBuy ] = useState<{ shares: string, buy: string }>({ shares: '', buy: '' });
    const isAddDisabled: boolean = sharesBuy.shares === '' || sharesBuy.buy === '';

    const fetchSymbolsList = (e: React.FormEvent<HTMLInputElement>) => {
        if ( e.currentTarget.value.length > 1 ) {
            symbolService.symbolSearch(e.currentTarget.value)
                .then(res => {
                    if ( res[ 'Note' ] ) {
                        searchSymbolFail();
                        addError(AppErrorType.SearchSymbol);
                        setSearchResult([ { symbol: 'error', description: '' } ]);
                        return;
                    }
                    setSearchResult(symbolsSearchMapper(res))
                })
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

    const getSearchResultList = (): ReactNode => {
        const existPending: string[] = pendingSymbols.reduce<string[]>((acc, item) => acc.concat(item.symbol), []);
        return (
            <div className='search-result-list'>
                {
                    searchResult.map((result: SearchResult): ReactNode => {
                            const getResultNode = (resultItem: SearchResult): ReactNode => (
                                <div className='search-result-list__item'
                                     key={ resultItem.symbol }
                                     id={ resultItem.symbol }>
                                    <span onClick={ startEditMode }>{ resultItem.symbol }</span>
                                    <span onClick={ startEditMode }>  { resultItem.description }</span>
                                </div>
                            );

                            return !existPending.includes(result.symbol.toLowerCase()) && getResultNode(result)
                        }
                    )
                }
            </div>
        );
    };

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
            <Button name='add' onButtonClick={ addSymbol } disabled={ isAddDisabled }/>
            <Button name='cancel' onButtonClick={ cancelAddSymbolMode }/>
        </div>
    );

    return (
        <div className='total-row'>
            { searchInput }
            { (!addSymbolMode && searchResult[ 0 ]) && getSearchResultList() }
            { addSymbolMode && getSharesBuyNodes('shares') }
            { addSymbolMode && getSharesBuyNodes('buy') }
            { addSymbolMode && totalControls }
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(SymbolSearch));
