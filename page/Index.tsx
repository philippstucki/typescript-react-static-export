import * as React from 'react';
import { Route } from './Routes';
import { getLoadableComponent } from '../src/utils/loadableComponent';
import { Home } from './Home';

interface IndexProps {
    route: Route;
}

const LoadableAbout = getLoadableComponent(
    () => import(/* webpackChunkName: "About" */ './About'),
    m => m.About
);
const LoadableContact = getLoadableComponent(
    () => import(/* webpackChunkName: "Contact" */ './Contact'),
    m => m.Contact
);

export const Index = (p: IndexProps) => {
    if (p.route === 'about') {
        return <LoadableAbout n={123} />;
    } else if (p.route === 'contact') {
        return <LoadableContact />;
    } else {
        return <Home />;
    }
};
