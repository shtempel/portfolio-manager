import { itCreatesAction, itCreatesActionWithPayload } from '../../jest/test-helpers';
import * as actions from './actions';

describe('symbol actions', () => {
    describe('row selections', () => {
        itCreatesActionWithPayload('should create select row action', actions.selectSymbolRow, 'symbol');
        itCreatesAction('should create  select all rows action', actions.selectAllRows);
        itCreatesAction('should create  deselect all rows action', actions.deselectAllRows);
    });
});
