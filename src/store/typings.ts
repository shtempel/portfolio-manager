import { RouterState } from 'connected-react-router';
import { RouterSavedState } from './router/typing';

export interface AppSavedState {
    language?: string;
    router?: RouterSavedState;
}

export interface AppState extends AppSavedState {
    language: string;
    router: RouterState;
}
