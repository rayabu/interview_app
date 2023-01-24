import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import App from '@interviewApp/src/shared/App';
import createStore from '../shared/redux/store';
import {CookiesProvider} from 'react-cookie';

const preloadedState = (window as any)['__PRELOADED_STATE__'];
delete (window as any)['__PRELOADED_STATE__'];

const store = createStore(preloadedState);

ReactDOM.hydrate(
  <ReduxProvider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ReduxProvider>,
  document.getElementById('root'),
);
