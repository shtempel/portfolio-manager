import { createSelector } from 'reselect';

import { AppState } from '../typings';

const slice = (state: AppState) => state.symbolState;

// Portfolio

export const selectPortfolio = createSelector(
    [ slice ],
    state => state.portfolio
);

// Pending
export const selectPendingSymbols = createSelector(
    [ slice ],
    state => state.pendingSymbols
);

export const selectTotalPendingShares = createSelector(
    [ selectPendingSymbols ],
    pendingSymbols => pendingSymbols
        .map(pendingSymbol => parseInt(pendingSymbol.shares, 10))
        .reduce((accumulator, currentValue) => accumulator + currentValue).toString()
);


export const selectTotalPendingBuy = createSelector(
    [ selectPendingSymbols ],
    pendingSymbols => pendingSymbols
        .map(pendingSymbol => parseInt(pendingSymbol.buy, 10) * parseInt(pendingSymbol.shares, 10))
        .reduce((accumulator, currentValue) => accumulator + currentValue).toString()
);
