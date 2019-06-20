import { getType } from 'typesafe-actions';
import { createMemoryHistory } from 'history';

import { rootReducer } from '../store/store';

type ActionCreator<T extends string> = () => { type: T };

export function itCreatesAction<T extends string>(
    name: string,
    actionCreator: ActionCreator<T>
) {
    test(name, () => {
        const expected = { type: getType(actionCreator) };
        const actual = actionCreator();

        expect(expected).toEqual(actual);
    });
}

type ActionCreatorWithPayload<T extends string, P> = (
    payload: P
) => { type: T; payload: P };

export function itCreatesActionWithPayload<T extends string, TPayload>(
    name: string,
    actionCreator: ActionCreatorWithPayload<T, TPayload>,
    payload: TPayload
) {
    test(name, () => {
        const expected = { type: getType(actionCreator), payload };
        const actual = actionCreator(payload);

        expect(actual).toEqual(expected);
    });
}

/**
 * Creates root reducer. Useful for testing selectors
 * @example
 * const rootReducer = getRootReducer();
 *
 * let state = rootReducer(undefined, { } as any);
 */
export function getRootReducer() {
    return rootReducer(createMemoryHistory());
}
