import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

// Import pages
import Login from "./components/pages/Login/Login";
import Signin from './components/pages/Signin/Signin'

require('dotenv').config();

function App() {

  return (
    <div className="row">
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
