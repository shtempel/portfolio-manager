import { RouterState } from 'connected-react-router';

import { RouterSavedState } from './router/typing';
import { PendingSymbolItem, PortfolioSymbolItem, SymbolState } from './symbol/typings';

export interface AppSavedState {
    language?: string;
    router?: RouterSavedState;
    pending?: PendingSymbolItem[];
    portfolio?: PortfolioSymbolItem[];
}

export interface AppState extends AppSavedState {
    symbolState: SymbolState;
    language: string;
    router: RouterState;
}
