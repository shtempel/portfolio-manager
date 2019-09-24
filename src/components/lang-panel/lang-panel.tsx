import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { getType } from 'typesafe-actions';

import { AppState } from '../../store/typings';
import { selectLanguage } from '../../store/language/selectors';
import { setLanguage } from '../../store/language/actions';
import { Languages } from '../../services/typings';

import './lang-panel.scss';

const LangPanel: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();

    const language = useSelector<AppState, string>(selectLanguage);

    const changeLanguage = (e: any) => {
        if ( e.target.id !== language ) {
            dispatch({ type: getType(setLanguage), payload: e.target.id });
            window.location.reload();
        }
    };

    return (
        <div className='lang-panel row'>
            <span id={ Languages.en }
                  onClick={ changeLanguage }
                  className={ cn('not-active', { 'active': language === 'en-US' }) }>{ t('eng') }</span>
            <span id={ Languages.ru }
                  onClick={ changeLanguage }
                  className={ cn('not-active', { 'active': language === 'ru-RU' }) }>{ t('rus') }</span>
        </div>
    );
};

export default LangPanel;
