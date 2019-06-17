import { createAction } from 'typesafe-actions';
import { AppSavedState } from '../typings';

export const rehydrateState = createAction('REHYDRATE_STATE');

export const rehydrateStateDone = createAction('REHYDRATE_STATE_DONE');

export const restoreSavedState = createAction(
    'RESTORE_SAVED_STATE',
    resolve => (savedState: AppSavedState) => resolve(savedState)
);
