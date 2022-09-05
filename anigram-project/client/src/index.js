import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
=======
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
>>>>>>> 98e400e535ef7884ae21c63455ab357d715ceb66
