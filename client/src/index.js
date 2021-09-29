import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './pwnz/pwnz.css';
import './index.css';

//история отдельно для возможности ее использования в middleware при dispatch redirect
import {history} from './history';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './redux/store';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
