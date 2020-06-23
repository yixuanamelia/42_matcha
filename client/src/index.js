import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from "react-router-dom";
import { Router } from 'react-router'
const createHistory = require("history").createBrowserHistory;

const history = createHistory();

ReactDOM.render(
    <Router history={history}>
      <div>
          <HashRouter>
        <App />
        </HashRouter>
      </div>
    </Router>, document.getElementById('root'));
serviceWorker.unregister();
