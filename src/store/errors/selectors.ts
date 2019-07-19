import { last } from 'lodash';
import { createSelector } from 'reselect';
import { AppState } from '../typings';


const slice = (state: AppState) => state.errors;

export const selectLastError = createSelector(
    slice,
    state => last(state.filter(error => error))
);
