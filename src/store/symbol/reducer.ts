import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { restoreSavedState } from '../saved-state/actions';
import { PendingSymbolItem, SymbolState } from './typings';
import * as actions from './actions';

const initialState: SymbolState = {
    pendingSymbols: [],
    portfolio: [],
    isFetching: false
};

export type SymbolAction =
    | ActionType<typeof actions>
    | ActionType<typeof restoreSavedState>;

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
                isFetching: true
            }
        }

        case getType(actions.fetchPortfolioSymbolFail): {
            return {
                ...state,
                isFetching: false
            }
        }

        case getType(actions.fetchPortfolioSymbolSuccess): {
            const sharesBuy: { shares: string, buy: string } = state.pendingSymbols
                .filter((symbol: PendingSymbolItem) => symbol.symbol === action.payload.name)
                .reduce((item: PendingSymbolItem) => item);
            return {
                ...state,
                portfolio: [
                    ...state.portfolio,
                    {
                        ...action.payload,
                        shares: sharesBuy.shares,
                        buy: sharesBuy.buy
                    }
                ],
                isFetching: false
            }
        }

        case getType(actions.deletePortfolioSymbol): {
            return {
                ...state,
                portfolio: state.portfolio.filter(item => item.name !== action.payload)
            }
        }

        case getType(restoreSavedState): {
            const { pending, portfolio } = action.payload;

            return {
                ...state,
                pendingSymbols: pending || [],
                portfolio: portfolio || []
            }
        }

        default: {
            return state;
        }
    }
};

export default reducer;
