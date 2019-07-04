import { getType } from 'typesafe-actions';
import { throttle, call, put } from 'redux-saga/effects';

import { symbolPortfolioMapper } from '../../common/mappers/symbol-mappers';
import { symbolService } from '../../services';
import * as actions from '../symbol/actions';

const THROTTLE = 1000;

function* watchFetchPortfolioSymbol() {
    yield throttle(THROTTLE, getType(actions.fetchPortfolioSymbol), fetchPortfolioSymbol);
}

function* fetchPortfolioSymbol(action: ReturnType<typeof actions.fetchPortfolioSymbol>) {
    try {
        const fetchedSymbol = yield call(symbolService.getSymbol, action.payload);
        yield put(actions.fetchPortfolioSymbolSuccess(symbolPortfolioMapper(fetchedSymbol, '1', '2')));
    } catch ( error ) {
        yield put(actions.fetchPortfolioSymbolFail(error));
        console.log(error)
    }
}

export const symbolSagas = [
    watchFetchPortfolioSymbol()
];
