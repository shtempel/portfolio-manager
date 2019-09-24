import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';

import { Button } from '..';
import { AppState } from '../../store/typings';
import { selectCurrentPath } from '../../store/router/selectors';
import { ROUTES } from '../../routes';
import { selectIsPortfolioAvailable } from '../../store/symbol/selectors';

import './nav-bar.scss';

const NavBar: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();

    const currentPath = useSelector<AppState, string>(selectCurrentPath);
    const isPortfolioAvailable = useSelector<AppState, boolean>(selectIsPortfolioAvailable);
    const navigate = (pathname: string) => {
        dispatch({
            type: '@@router/LOCATION_CHANGE',
            payload: {
                location: { pathname: pathname },
                action:'POP'
            }
        });
    };

    const toManage = () => currentPath !== ROUTES.manage && navigate(ROUTES.manage);
    const toMonitor = () => currentPath !== ROUTES.monitor && navigate(ROUTES.monitor);

    return (
        <div className='nav-bar'>
            <Button customClass='nav-btn'
                    active={ currentPath === ROUTES.manage }
                    name={ t('manage') }
                    onButtonClick={ toManage }/>
            <Button customClass='nav-btn'
                    disabled={ !isPortfolioAvailable }
                    active={ currentPath === ROUTES.monitor }
                    name={ t('monitor') }
                    onButtonClick={ toMonitor }/>
        </div>
    );
};

export default NavBar;
