import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
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
      <Auth0Provider
    domain="dev-ag6dojqlg1wnjyzo.us.auth0.com"
    clientId="5SSNFsMHnvGYm4kCPXaa4mryJVbDzYLe"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <App />
      </Auth0Provider>   
    </Provider>,
    
  document.getElementById('root')
  
);
serviceWorker.unregister();

