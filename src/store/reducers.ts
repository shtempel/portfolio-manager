import languageStateReducer from './language/reducer';
import symbolReducer from './symbol/reducer';
import errorReducer from './errors/reducer';

export default {
    language: languageStateReducer,
    symbol: symbolReducer,
    errors: errorReducer
}
