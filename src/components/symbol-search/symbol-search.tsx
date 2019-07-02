import React, { FC, ReactNode, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { AppState } from '../../store/typings';
import { symbolService } from '../../services';
import { symbolsSearchMapper } from '../../common/mappers/symbol-mappers';
import { SearchResult } from '../../services/typings';

import './symbol-search.scss';
import { fetchSymbol } from '../../store/symbol/actions';

interface SymbolSearchProps {
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {};

export const SymbolSearch: FC<SymbolSearchProps> = (props: SymbolSearchProps) => {
    const { t } = useTranslation();
    const [ searchResult, setSearchResult ] = useState<SearchResult[]>([]);
    const [ pendingSymbol, setPendingSymbol ] = useState<SearchResult>({ symbol: '', description: '' });
    const [ addSymbolMode, setAddSymbolMode ] = useState<boolean>(false);

    const onInputKeyUp = (e: React.FormEvent<HTMLInputElement>) => {
        if ( e.currentTarget.value.length > 1 ) {
            symbolService.symbolSearch(e.currentTarget.value)
                .then(res => setSearchResult(symbolsSearchMapper(res)))
        }
    };

    const addPendingSymbol = (e: any) => {
        setPendingSymbol({ symbol: e.target.parentNode.id, description: '' });
        setAddSymbolMode(true);
    };

    const addSymbolInput: ReactNode = (
        <div>
            <input type='text' placeholder={ pendingSymbol.symbol }/>
        </div>
    );

    const searchResultList: ReactNode = (
        <div className='search-result-list'>
            {
                searchResult.map((result: SearchResult) => (
                    <div className='search-result-list__item'
                         key={ result.symbol } id={ result.symbol }>
                        <span
                            onClick={ addPendingSymbol }>
                            { result.symbol }
                        </span>
                        <span onClick={ addPendingSymbol }>  { result.description }</span>
                    </div>
                ))
            }
        </div>
    );

    const searchInput: ReactNode = addSymbolMode
        ? addSymbolInput
        : <input onChange={ onInputKeyUp } type='text' placeholder={ t('search.placeholder') }/>;


    return (
        <div className='total-row'>
            { searchInput }
            { (!addSymbolMode && searchResult.length > 0) && searchResultList }
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SymbolSearch);
