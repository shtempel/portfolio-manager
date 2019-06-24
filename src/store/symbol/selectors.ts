import { createSelector } from 'reselect';

import { AppState } from '../typings';

const slice = (state: AppState) => state.symbolState;

export const selectPortfolio = createSelector(
    [ slice ],
    state => state.portfolio
);

export const selectPendingSymbols = createSelector(
    [ slice ],
    state => state.pendingSymbols
);
