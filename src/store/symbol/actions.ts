import { createAction } from 'typesafe-actions';

export const selectSymbolRow = createAction(
    'SELECT_SYMBOL_ROW',
    resolve => (name: string) => resolve(name)
);

export const selectAllRows = createAction('SELECT_ALL_ROWS');

export const deselectAllRows = createAction('DESELECT_ALL_ROWS');

export const deleteRow = createAction(
    'DELETE_ROW',
    resolve => (id: string) => resolve(id)
);
