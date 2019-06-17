import {
    all,
    call,
    put,
    select,
    takeEvery,
    throttle
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from "connected-react-router";
import { getType } from 'typesafe-actions';
import { AppSavedState } from '../typings';
import { selectSavedState } from './selectors';
import * as actions from './actions';
import { localStorageService } from '../../services';
import { setLanguage } from '../language/actions';

export const saveStateActions: string[] = [
    LOCATION_CHANGE,
    getType(setLanguage)
];

const SAVE_STATE_THROTTLE = 500;
const STATE_KEY = 'PORTFOLIO';

// Restore state

export function* watchRehydrateState() {
    yield takeEvery(getType(actions.rehydrateState), rehydrateState);
}

export function* rehydrateState() {
    const state: AppSavedState = yield call(fetchState);

    if (state) {
        if (state.router) {
            yield put(push(state.router.location.pathname))
        }
        yield put(actions.restoreSavedState(state));
    }

    yield put(actions.rehydrateStateDone());
}

const fetchState = () => localStorageService.getItem(STATE_KEY);

// Saving state

export function* watchSaveState() {
    yield throttle(SAVE_STATE_THROTTLE, saveStateActions, saveState);
}

export function* saveState() {
    const savedState = yield select(selectSavedState);

    yield call([localStorageService, localStorageService.setItem],
        STATE_KEY,
        savedState)
}

export default function* saveStateAppSagas() {
    yield all([watchSaveState(), watchRehydrateState()]);
}
