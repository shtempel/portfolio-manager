import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { SymbolState } from './typings';
import * as actions from './actions';

const initialState: SymbolState = {
    pendingSymbols: [],
    portfolio: [],
    isLoading: false
};

export type SymbolAction = ActionType<typeof actions>;

const reducer: Reducer<SymbolState, SymbolAction> = (state = initialState, action) => {

    switch (action.type) {
        case getType(actions.addPendingSymbol): {
            return {
                ...state,
                pendingSymbols: [
                    ...state.pendingSymbols,
                    action.payload
                ]
            }
        }

        case getType(actions.deletePendingSymbol): {
            return {
                ...state,
                pendingSymbols: state.pendingSymbols.filter(item => item.symbol !== action.payload)
            }
        }

        case getType(actions.fetchPortfolioSymbol): {
            return {
                ...state,
                isLoading: true
            }
        }

        case getType(actions.fetchPortfolioSymbolSuccess): {
            return {
                ...state,
                portfolio: [
                    ...state.portfolio,
                    action.payload
                ],
                isLoading: false
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;
