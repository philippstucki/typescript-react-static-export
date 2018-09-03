# Export React/TypeScript-Apps as Static Files

Provides a simple API to export existing React/TypeScript-Apps to static files using webpack.

INCOMPLETE: currently work in progress...

# Todo

-   [ ] figure out why bootstrap code in main.ts is not output by webpack
-   [ ] only add assets to pages which are dependencies of the page entry point
-   [ ] also add assets which need to be prefetched
-   [ ] improve page / entrypoint definition (entry points should be string literals)
-   [ ] output.chunkfilename in webpack config seems to affect execution of code
