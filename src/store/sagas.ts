import { all, put, take } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { rehydrateStateDone, rehydrateState } from './saved-state/actions';
import {saveStateSagas} from './saved-state/sagas';
import { init } from './actions';
import { symbolSagas } from './symbol/sagas';

/**
 * Rehydrate store
 */
export function* watchInit() {
    yield take(getType(init));

    yield put(rehydrateState());
}

/**
 * Act when store is initialized
 */
export function* watchInitDone() {
    yield take(getType(rehydrateStateDone));
}

export default function* rootSaga() {
    yield all([
        watchInit(),
        watchInitDone(),
        ...saveStateSagas,
        ...symbolSagas
    ]);
}
