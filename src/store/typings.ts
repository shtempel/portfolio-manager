import { RouterState } from 'connected-react-router';

import { RouterSavedState } from './router/typing';
import { SymbolState } from './symbol/typings';

export interface AppSavedState {
    language?: string;
    router?: RouterSavedState;
}

export interface AppState extends AppSavedState {
    symbolState: SymbolState;
    language: string;
    router: RouterState;
}
