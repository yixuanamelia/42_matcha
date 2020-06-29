import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

// Import pages
import Login from "./components/pages/Login/Login";
import Signin from './components/pages/Signup/Signup'

require('dotenv').config();

function App() {

  return (
    <div className="row">
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
