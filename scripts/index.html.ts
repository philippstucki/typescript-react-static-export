interface IndexArguments {
    title: string;
    html: string;
    scripts: string;
}
export const index = (args: IndexArguments) => `<html className="no-js">
    <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1"
        />
        <title>${args.title}</title>
    </head>
    <body>
        <div id="main">${args.html}</div>
    </body>
</html>
`;
