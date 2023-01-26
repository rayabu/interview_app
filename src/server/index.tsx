import * as React from 'react';
import * as ReactDOM from "react-dom/server";
import * as Express from 'express';
import {Provider as ReduxProvider} from 'react-redux';
import {StaticRouter as Router} from 'react-router-dom';
import App from '@interviewApp/src/shared/App';
import createStore from '../shared/redux/store';
import express from 'express';
import apiInit from './api';
import validateAccessTokenMiddleware from './middlewares/validateAccessToken';
import cookieParser from 'cookie-parser';
import mockDb from './mockDb';
import {CookiesProvider} from 'react-cookie';

declare const module: any;

function main() {
  const app = express();
  const port = 8080;

  app.use(Express.static('build'));

  app.get('/*', (req, res, next) => {
    const store = createStore({
      userProfile: null,
    });

    const appHTML = ReactDOM.renderToString(
      <ReduxProvider store={store}>
        <CookiesProvider>
          <Router location={req.path} context={{}}>
            <App />
          </Router>
        </CookiesProvider>
      </ReduxProvider>,
    );
    const appInitialState = JSON.stringify(store.getState()).replace(
      /</g,
      '\\u003c',
    );

    res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>TypeScript ReactJS SSR App</title>
                    <style>
                        body {
                            margin: 0px;
                            padding: 0px;
                        }
                    </style>
                    <link rel="stylesheet" href="globalStyles.css" type="text/css" >
                    <link
                      rel="stylesheet"
                      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                      crossorigin="anonymous"
                    />
                </head>
                <body>
                    <main id="root">${appHTML}</main>
                    <script>
                        window["__PRELOADED_STATE__"] = ${appInitialState}
                    </script>
                    <script type="application/javascript" src="bundle.js"></script>
                </body>
            </html>
        `);
    res.end();
    next();
  });

  app.use(cookieParser());
  apiInit(app, mockDb());
  app.use(validateAccessTokenMiddleware);

  const server = app.listen(port, '0.0.0.0', () =>
    console.info(`Listening at port ${port}`),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
