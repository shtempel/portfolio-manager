import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';
import { AppError } from './typings';

export type ErrorsAction = ActionType<typeof actions>;

export type ErrorsState = ReadonlyArray<AppError>;

const reducer: Reducer<ErrorsState, ErrorsAction> = (state = [], action) => {
    switch (action.type) {
        case getType(actions.addError): {
            const { payload: error } = action;

            return [...state, error];
        }

        case getType(actions.deleteAllErrors): {
            return [];
        }

        default: {
            return state;
        }
    }
};

export default reducer;
