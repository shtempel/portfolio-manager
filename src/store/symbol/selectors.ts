import { createSelector } from 'reselect';

import { AppState } from '../typings';

const slice = (state: AppState) => state.symbolState;

export const selectPortfolio = createSelector(
    [ slice ],
    state => state.portfolio
);

export const selectIsSomeRowsSelected = createSelector(
    [ selectPortfolio ],
    selectPortfolio => selectPortfolio.some(symbol => symbol.isChecked));

export const selectSelectedRows = createSelector(
    [ selectPortfolio ],
    selectPortfolio => selectPortfolio.filter(symbol => symbol.isChecked ).length
);
