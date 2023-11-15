import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';//my work
import { createStore, applyMiddleware } from 'redux';//my work
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger';//my work
import UserReducer  from './reducers/UserReducer';//my work

//ReactDOM.render(<App />, document.getElementById('root'));
let store = createStore(UserReducer, applyMiddleware(logger));//creating store

ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();

