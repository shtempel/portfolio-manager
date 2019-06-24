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
