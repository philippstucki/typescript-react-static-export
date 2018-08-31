import { page } from './page';
import * as ReactDomServer from 'react-dom/server';

export namespace html {
    export const renderPage = (page: page.Page) =>
        ReactDomServer.renderToString(page.render());
}
