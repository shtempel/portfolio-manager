import languageStateReducer from './language/reducer';
import symbolReducer from './symbol/reducer';
import chartReducer from './chart/reducer';

export default {
    language: languageStateReducer,
    symbol: symbolReducer,
    chart: chartReducer
}
