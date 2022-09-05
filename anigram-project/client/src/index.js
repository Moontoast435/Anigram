import React from "react";
import ReactDOM from 'react-dom/client';
import Layout from './hocs/Layout'

import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
        <Router>
          <Layout>
            <App />
          </Layout>
        </Router>
      </Provider>
);
