import React, { FC } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '..';
import { AppState } from '../../store/typings';
import { selectCurrentPath } from '../../store/router/selectors';
import { ROUTES } from '../../routes';
import { selectIsPortfolioAvailable } from '../../store/symbol/selectors';

import './nav-bar.scss';

interface NavBarProps {
    currentPath: string;
    isPortfolioAvailable: boolean;

    push(path: string): void;
}

const mapStateToProps = (state: AppState) => ({
    currentPath: selectCurrentPath(state),
    isPortfolioAvailable: selectIsPortfolioAvailable(state)
});

const mapDispatchToProps = { push };

const NavBar: FC<NavBarProps> = (props: NavBarProps) => {
    const { currentPath, push, isPortfolioAvailable } = props;
    const { t } = useTranslation();

    const toManage = () => currentPath !== ROUTES.manage && push(ROUTES.manage);
    const toMonitor = () => currentPath !== ROUTES.monitor && push(ROUTES.monitor);

    return (
        <div className='nav-bar'>
            <Button customClass='nav-btn'
                    active={ currentPath === ROUTES.manage }
                    name={ t('navBar.manage') }
                    onButtonClick={ toManage }/>
            <Button customClass='nav-btn'
                    disabled={ !isPortfolioAvailable }
                    active={ currentPath === ROUTES.monitor }
                    name={ t('navBar.monitor') }
                    onButtonClick={ toMonitor }/>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
