import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Index } from './Index';

const renderMain = () => {
    ReactDOM.hydrate(
        React.createElement(Index, { route: 'about' }),
        document.getElementById('main')
    );
};

renderMain();
