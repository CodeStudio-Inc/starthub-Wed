import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './components/store/reducers'
import ReactGA from 'react-ga'

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
ReactGA.pageview(window.location.pathname + window.location.search)

require('./components/store/firebase')

const reducerPersistor = persistReducer({ key: "root", storage }, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducerPersistor, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
