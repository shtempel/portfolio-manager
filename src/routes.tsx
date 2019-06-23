import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import * as pages from './pages/index';

export const ROUTES = {
    manage: '/manage',
    monitor: '/monitor'
};

const routes = (
    <div className='router'>
        <Switch>
            <Route    exact path={ ROUTES.manage } component={ pages.Manage }/>
            <Route    path={ ROUTES.manage }       component={ pages.Manage }/>
            <Route    path={ ROUTES.monitor }      component={ pages.Monitor }/>
            <Redirect to={ ROUTES.manage }/>
        </Switch>
    </div>
);

export default routes;
