import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

// Import pages
import Login from './components/pages/Login/Login';
import Signup from './components/pages/Signup/Signup';
import ForgotPass from './components/pages/ForgotPass/ForgotPass';
import Main from './components/pages/Main/Mainpage';

require('dotenv').config();

function App() {

  return (
    <div className="row">
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotPass" component={ForgotPass} />
          <Route exact path="/home" component={Main} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
