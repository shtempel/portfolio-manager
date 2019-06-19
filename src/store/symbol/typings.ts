export interface SymbolState {
    portfolio: PortfolioSymbolItem[];
}

export interface PortfolioSymbolItem {
    symbol: string;
    description: string;
    shares: string;
    buy: string;
    isChecked: boolean;
}
