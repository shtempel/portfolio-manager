import { PortfolioSymbolItem } from '../../store/symbol/typings';

export const parser = (jsonObj: JSON[], pattern: string) => {
    let array: any = [];

    for (let key in jsonObj) {
        // @ts-ignore
        array.push(parseFloat(jsonObj[ key ][ pattern ]));
    }

    return array;
};

export const symbolPortfolioMapper = (res: any, shares: string, buy: string): PortfolioSymbolItem => {
    return {
        name: res[ 'Meta Data' ][ '2. Symbol' ],
        lastRefreshed: res[ 'Meta Data' ][ '3. Last Refreshed' ],
        history: parser(res[ `Time Series (${ res[ 'Meta Data' ][ '4. Interval' ] })` ], '4. close'),
        currentValue: res[ `Time Series (${ res[ 'Meta Data' ][ '4. Interval' ] })` ][ res[ 'Meta Data' ][ '3. Last Refreshed' ] ][ '4. close' ],
        shares: shares,
        buy: buy
    }
};
