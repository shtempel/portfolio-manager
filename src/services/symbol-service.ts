import axios from 'axios';

import { extractData } from '../common/mappers/axios-mappers';
import { Interval, RequestFunction, SearchSymbolsInterval } from '../store/symbol/typings';

const API_KEY = 'HXUPIOKPMJR44CYI';
const BASE_URL = 'https://www.alphavantage.co/query';
const SymbolService = () => {
    return {
        symbolSearch(keywords: string, interval: SearchSymbolsInterval = Interval.sixty) {
            return axios
                .get(BASE_URL,
                    {
                        params: {
                            function: RequestFunction.SymbolSearch,
                            keywords: keywords,
                            interval: interval,
                            apikey: API_KEY,
                        },
                    })
                // .catch(this.handleError)
                .then(extractData)
        },

        getSymbol(symbol: string, interval: SearchSymbolsInterval = Interval.sixty) {
            return axios
                .get(BASE_URL,
                    {
                        params: {
                            function: RequestFunction.Intraday,
                            symbol: symbol,
                            interval: interval,
                            apikey: API_KEY,
                        }
                    })
                // .catch(this.handleError)
                .then(extractData);
        }
    }
};


export default SymbolService();
