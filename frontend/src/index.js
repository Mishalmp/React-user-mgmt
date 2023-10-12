import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { Store,persistor } from './Redux/store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>

    <App />
    </PersistGate>
    </Provider>
  </BrowserRouter>
);
