export interface SymbolState {
    portfolio: PortfolioSymbolItem[];
    pendingSymbols: PortfolioSymbolItem[];
}

export interface PortfolioSymbolItem {
    symbol: string;
    description: string;
    shares: string;
    buy: string;
    isChecked: boolean;
}
