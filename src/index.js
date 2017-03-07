import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { api, store } from './domain';

import AppProvider from './components/AppProvider/AppProvider';
import App from './components/App/App';

ReactDOM.render(
  <AppProvider api={api} store={store}>
    <App />
  </AppProvider>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
