import { createAction } from 'typesafe-actions';

import { PendingSymbolItem } from './typings';

export const deletePendingSymbol = createAction(
    'DELETE_PENDING_SYMBOL',
    resolve => (id: string) => resolve(id)
);

export const addPendingSymbolToPortfolio = createAction(
    'ADD_PENDING_SYMBOL_TO_PORTFOLIO',
    resolve => (symbol: PendingSymbolItem) => resolve(symbol)
);
