import { createAction } from 'typesafe-actions';

import { PendingSymbolItem, PortfolioSymbolItem } from './typings';

export const deletePendingSymbol = createAction(
    'DELETE_PENDING_SYMBOL',
    resolve => (id: string) => resolve(id)
);

export const addPendingSymbol = createAction(
    'ADD_PENDING_SYMBOL',
    resolve => (symbol: PendingSymbolItem) => resolve(symbol)
);

export const fetchPortfolioSymbol = createAction(
    'FETCH_PORTFOLIO_SYMBOL',
    resolve => (id: string) => resolve(id)
);

export const fetchPortfolioSymbolSuccess = createAction(
    'FETCH_PORTFOLIO_SYMBOL_SUCCESS',
    resolve => (symbol: PortfolioSymbolItem) => resolve(symbol)
);

export const fetchPortfolioSymbolFail = createAction(
    'FETCH_PORTFOLIO_SYMBOL_FAIL',
    resolve => (error: Error) => resolve(error)
);
