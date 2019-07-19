import { RouterState } from 'connected-react-router';
import { ErrorsState } from './errors/reducer';

import { RouterSavedState } from './router/typing';
import { PendingSymbolItem, PortfolioSymbolItem, SymbolState } from './symbol/typings';

export interface AppSavedState {
    language?: string;
    router?: RouterSavedState;
    pending?: PendingSymbolItem[];
    portfolio?: PortfolioSymbolItem[];
}

export interface AppState extends AppSavedState {
    symbol: SymbolState;
    language: string;
    router: RouterState;
    errors: ErrorsState;
}
