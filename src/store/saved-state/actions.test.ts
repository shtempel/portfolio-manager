import * as action from './actions';
import { itCreatesAction, itCreatesActionWithPayload } from '../../jest/test-helpers';

describe('saved-state actions', () => {
    describe('rehydrate state', () => {
        itCreatesAction('rehydrate state', action.rehydrateState);
        itCreatesAction('rehydrate state done', action.rehydrateStateDone);
    });

    itCreatesActionWithPayload('restore state', action.restoreSavedState, {});
});
