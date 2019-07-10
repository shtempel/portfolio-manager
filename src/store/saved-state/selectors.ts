import { createSelector } from 'reselect';

import { selectLanguage } from '../language/selectors';
import { selectRouterSavedState } from '../router/selectors';
import { selectPendingSymbols, selectPortfolio } from '../symbol/selectors';

export const selectSavedState = createSelector(
    [ selectLanguage, selectRouterSavedState, selectPendingSymbols, selectPortfolio ],
    (language, router, pending, portfolio) => ({
        language, router, pending, portfolio
    })
);
