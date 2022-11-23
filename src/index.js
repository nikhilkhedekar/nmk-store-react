import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { AuthProvider } from './providers/authProvider';
import { store } from './store/store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { MapProvider } from "react-map-gl";
import { BrowserRouter } from 'react-router-dom';

import 'mapbox-gl/dist/mapbox-gl.css';
import AlanProvider from './providers/alanProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient} >
      <AuthProvider>
        <Provider store={store} >
          <MapProvider>
            <BrowserRouter>
              <AlanProvider>
                <App />
              </AlanProvider>
            </BrowserRouter>
          </MapProvider>
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

