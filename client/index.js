import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import history from './history'

import clientSocket from './socket';
import '../public/bootstrap.min.css';
import '../public/style.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter  history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
