import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/reducers.js'
import thunkMiddleware from 'redux-thunk'

import './css/index.css';
import App from './container/App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
