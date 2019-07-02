import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { SymbolState } from './typings';
import * as actions from './actions';

const initialState: SymbolState = {
    pendingSymbols: [
        {
            symbol: 'msft',
            buy: '100',
            description: 'asdasdasd',
            shares: '23'
        },
        {
            symbol: 'aapl',
            buy: '200',
            description: 'asdasdasd',
            shares: '43'
        },
        {
            symbol: 'aap',
            buy: '200',
            description: 'asdasdasd',
            shares: '43'
        }
    ],
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

        case getType(actions.fetchSymbol): {
            return {
                ...state,
                isLoading: true
            }
        }

        case getType(actions.fetchSymbolSuccess): {
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
