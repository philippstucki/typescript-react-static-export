import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Index } from './Index';

const renderMain = async () => {
    const Index = await import('./Index');
    ReactDOM.render(
        React.createElement(Index.Index, {}),
        document.getElementById('main')
    );
};

renderMain();
