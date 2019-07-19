import { createAction } from 'typesafe-actions';

import { AppError, AppErrorType } from './typings';

export const addError = createAction(
    'ADD_ERROR',
    resolve => (type: AppErrorType, error?: Error) =>
        resolve<AppError>({
            id: Date.now(),
            type,
            error
        })
);

export const deleteAllErrors = createAction('DELETE_ALL_ERRORS');
