import { ConnectedRouter } from 'connected-react-router';
import React, { FC } from 'react';

import routes from './routes';
import { appHistory } from './store/store';

import './App.scss';

const App: FC = () => {
    return (
        <div className='App'>
            <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
        </div>
    );
};

export default App;
