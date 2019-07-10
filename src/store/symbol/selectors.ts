import { createSelector } from 'reselect';

import { AppState } from '../typings';

const state = (state: AppState) => state.symbolState;

export const selectIsSymbolFetching = createSelector(
    [ state ],
    state => state.isFetching
);

// Portfolio

export const selectPortfolio = createSelector(
    [ state ],
    state => state.portfolio
);

export const selectIsPortfolioAvailable = createSelector(
    [ selectPortfolio ],
    portfolio => portfolio.length > 0
);

// Pending
export const selectPendingSymbols = createSelector(
    [ state ],
    state => state.pendingSymbols
);

export const selectTotalPendingShares = createSelector(
    [ selectPendingSymbols ],
    pendingSymbols => pendingSymbols
        .map(pendingSymbol => parseInt(pendingSymbol.shares, 10))
        .reduce((accumulator, currentValue) => accumulator + currentValue, '').toString()
);

export const selectTotalPendingBuy = createSelector(
    [ selectPendingSymbols ],
    pendingSymbols => pendingSymbols
        .map(pendingSymbol => parseInt(pendingSymbol.buy, 10) * parseInt(pendingSymbol.shares, 10))
        .reduce((accumulator, currentValue) => accumulator + currentValue, '').toString()
);
