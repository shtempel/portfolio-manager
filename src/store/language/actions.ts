import { createAction } from 'typesafe-actions';

export const setLanguage = createAction(
    'SET_LANGUAGE',
    resolve => (language: string) => resolve(language)
);
