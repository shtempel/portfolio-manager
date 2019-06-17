import { createSelector } from 'reselect';

import { selectLanguage } from '../language/selectors';
import { selectRouterSavedState } from '../router/selectors';

export const selectSavedState = createSelector(
    [ selectLanguage, selectRouterSavedState ],
    (language, router) => ({
        language, router
    })
);
