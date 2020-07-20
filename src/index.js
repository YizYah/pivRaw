import React from 'react';
import ReactDOM from 'react-dom';
import { NoStackProvider } from '@nostack/no-stack';

import { PLATFORM_ID } from './config';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import client from './client';
import { Provider as UnitDataProvider } from './custom/UnitDataContext';

ReactDOM.render(
  <NoStackProvider client={client} platformId={PLATFORM_ID}>
    <UnitDataProvider>
      <App />
    </UnitDataProvider>
  </NoStackProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
