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
            isChecked: true,
            shares: '23'
        },
        {
            symbol: 'aapl',
            buy: '200',
            description: 'asdasdasd',
            isChecked: false,
            shares: '43'
        }
    ],
    portfolio: []
};

export type SymbolAction = ActionType<typeof actions>;

const reducer: Reducer<SymbolState, SymbolAction> = (state = initialState, action) => {

    switch (action.type) {
        case getType(actions.selectSymbolRow): {
            return {
                ...state,
                portfolio: state.portfolio.map(item => {
                    if (item.symbol === action.payload) {
                        return {
                            ...item,
                            isChecked: !item.isChecked
                        }
                    }

                    return item;
                })
            }
        }

        case getType(actions.selectAllRows): {
            return {
                ...state,
                portfolio: state.portfolio.map(item => {
                    return {
                        ...item,
                        isChecked: true
                    }
                })
            }
        }

        case getType(actions.deselectAllRows): {
            return {
                ...state,
                portfolio: state.portfolio.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                })
            }
        }

        case getType(actions.deletePendingSymbol): {
            return {
                ...state,
                pendingSymbols: state.pendingSymbols.filter(item => item.symbol !== action.payload)
            }
        }

        default: {
            return state;
        }
    }
};

export default reducer;
