import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import App from '@interviewApp/src/shared/App';
import createStore from '../shared/redux/store';
import {CookiesProvider} from 'react-cookie';

const preloadedState = (window as any)['__PRELOADED_STATE__'];
delete (window as any)['__PRELOADED_STATE__'];

const store = createStore(preloadedState);

const rootNode = document.getElementById('root');

ReactDOM.hydrateRoot(
  rootNode,
  <ReduxProvider store={store}>
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>
  </ReduxProvider>,
);
