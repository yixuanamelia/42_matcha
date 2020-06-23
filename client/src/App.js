import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Login from "./components/pages/Login/Login";

require('dotenv').config();

function App() {

  return (
    <div className="row">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
