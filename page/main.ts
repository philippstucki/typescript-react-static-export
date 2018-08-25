import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Index } from './Index';

const renderMain = () => {
    ReactDOM.render(
        React.createElement(Index),
        document.getElementById('main')
    );
};

renderMain();
