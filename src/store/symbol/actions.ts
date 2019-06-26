import { createAction } from 'typesafe-actions';

import { PendingSymbolItem, PortfolioSymbolItem } from './typings';

export const fetchSymbol = createAction(
    'FETCH_SYMBOL',
    resolve => (id: string) => resolve(id)
);

export const fetchSymbolSuccess = createAction(
    'FETCH_SYMBOL_SUCCESS',
    resolve => (symbol: PortfolioSymbolItem) => resolve(symbol)
);

export const fetchSymbolFail = createAction(
    'FETCH_SYMBOL_FAIL',
    resolve => (error: Error) => resolve(error)
);

export const deletePendingSymbol = createAction(
    'DELETE_PENDING_SYMBOL',
    resolve => (id: string) => resolve(id)
);

export const addPendingSymbolToPortfolio = createAction(
    'ADD_PENDING_SYMBOL_TO_PORTFOLIO',
    resolve => (symbol: PendingSymbolItem) => resolve(symbol)
);
