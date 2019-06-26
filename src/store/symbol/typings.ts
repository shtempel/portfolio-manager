export interface SymbolState {
    portfolio: PortfolioSymbolItem[];
    pendingSymbols: PendingSymbolItem[];
}

export interface PortfolioSymbolItem {
    name: string;
    lastRefreshed: string;
    currentValue: string;
    history: number[];
    shares: string;
    buy: string;
}

export interface PendingSymbolItem {
    symbol: string;
    description: string;
    shares: string;
    buy: string;
}

export enum Interval {
    one = '1min',
    five = '5min',
    fifteen = '15min',
    thirty = '30min',
    sixty = '60min'
}

export enum RequestFunction {
    SymbolSearch = 'SYMBOL_SEARCH',
    Intraday = 'TIME_SERIES_INTRADAY'
}
