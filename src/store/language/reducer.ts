import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { Languages } from '../../services/typings';


import * as actions from './actions';

export type LanguageAction = ActionType<typeof actions>;

export const initialState: string = Languages.en;

const reducer: Reducer<string, LanguageAction> = (state = initialState, action) => {
        switch (action.type) {

            case getType(actions.setLanguage): {
                return action.payload;
            }

            default: {
                return state;
            }
        }
    }
;

export default reducer;
