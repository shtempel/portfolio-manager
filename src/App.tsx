import { ConnectedRouter } from 'connected-react-router';
import React, { FC } from 'react';

import routes from './routes';
import { appHistory } from './store/store';
import { NavBar, Header } from './components';

const App: FC = () => {
    return (
        <div className='app'>
            <Header/>
            <NavBar/>
            <ConnectedRouter history={ appHistory }>{ routes }</ConnectedRouter>
        </div>
    );
};

export default App;
