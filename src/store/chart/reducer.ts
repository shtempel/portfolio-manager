import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { restoreSavedState } from '../saved-state/actions';
import * as actions from './actions';
import { ChartState } from './typings';

const initialState: ChartState  = {
    name: null,
    data: null
};

export type SymbolAction =
    | ActionType<typeof actions>
    | ActionType<typeof restoreSavedState>;

const reducer: Reducer<ChartState, SymbolAction> = (state = initialState, action) => {

    switch (action.type) {
        default: {
            return state;
        }
    }
};

export default reducer;
