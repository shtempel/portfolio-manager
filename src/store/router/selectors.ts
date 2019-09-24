import { createSelector } from 'reselect';

import { AppState } from '../typings';
import { RouterSavedState } from './typing';


const slice = (state: AppState) => state.router;

export const selectCurrentPath = createSelector(
    [ slice ],
    pathName => pathName.location.pathname
);

export const selectRouterSavedState = createSelector(
    selectCurrentPath,
    (pathname): RouterSavedState => ({ location: { pathname } })
);
