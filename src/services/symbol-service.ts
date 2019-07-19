import axios from 'axios';
import { delay } from 'q';

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
                        }
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
        },

        poll(fn: any, retries = Infinity, timeoutBetweenAttempts = 1000) {
            return Promise.resolve()
                .then(fn)
                .catch(function retry(err): any {
                    if ( retries-- > 0 )
                        return delay(timeoutBetweenAttempts)
                            .then(fn)
                            .catch(retry);
                    throw err;
                });
        },

        getSymbolPoll(symbol: string, interval: SearchSymbolsInterval = Interval.sixty, retries: number, timeout: number) {
            function validate(res: any) {
                if ( !res.data || res.data.content.status !== 200 )
                    throw res;
            }

            return this.poll(() => axios
                .get(BASE_URL,
                    {
                        params: {
                            function: RequestFunction.Intraday,
                            symbol: symbol,
                            interval: interval,
                            apikey: API_KEY,
                        }
                    })
                .then(validate), retries, timeout)
        }
    }
};


export default SymbolService();
