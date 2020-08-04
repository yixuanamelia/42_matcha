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
import Home from './components/pages/Main/Home';
import Logout from './components/pages/Logout/Logout';

// Third party libraries
import decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';

require('dotenv').config();

function App() {
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      // { exp: 12903819203 }
      const { exp } = decode(token);

      if (exp < new Date().getTime() / 1000) {
        return false;
      }

    } catch (e) {
      return false;
    }

    return true;
  }

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    <div className="row">
      <Router>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotPass" component={ForgotPass} />
          <AuthRoute exact path="/" component={Home} />
          <AuthRoute exact path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
