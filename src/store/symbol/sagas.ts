import { getType } from 'typesafe-actions';
import { throttle, call, put } from 'redux-saga/effects';
import { symbolPortfolioMapper } from '../../common/mappers/symbol-mappers';

import { symbolService } from '../../services';
import * as actions from '../symbol/actions';

const THROTTLE = 1000;

function* watchFetchSymbol() {
    yield throttle(THROTTLE, getType(actions.fetchSymbol), fetchSymbol);
}

function* fetchSymbol(action: ReturnType<typeof actions.fetchSymbol>) {
    try {
        const fetchedSymbol = yield call(symbolService.getSymbol, action.payload);
        yield put(actions.fetchSymbolSuccess(symbolPortfolioMapper(fetchedSymbol, '1', '2')));
    } catch ( error ) {
        yield put(actions.fetchSymbolFail(error));
        console.log(error)
    }
}

export const symbolSagas = [
    watchFetchSymbol()
];
