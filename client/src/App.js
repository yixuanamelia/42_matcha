import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from 'react-router-dom';

// Import pages
import Login from './components/pages/Login/Login';
import Signup from './components/pages/Signup/Signup';
import ForgotPass from './components/pages/ForgotPass/ForgotPass';
import Home from './components/pages/Main/Home';
import Logout from './components/pages/Logout/Logout';
import EditProfile from './components/pages/Profile/EditProfile';
import ProfileDetail from './components/pages/ProfileDetail/ProfileDetail';
import Notifications from './components/pages/Notifications/NotificationsHome.js';
import Chat from './components/pages/Chat/chat';
import Suggestion from './components/pages/Suggestion/Suggestion';

// Third party libraries
import decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';

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
	};

	const AuthRoute = ({ component: Component, ...rest }) => (
		<Route
			{...rest}
			render={(props) =>
				checkAuth() ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);

	return (
		<div className='row'>
			<Router>
				<Switch>
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login' component={Login} />
					<AuthRoute exact path='/editprofile' component={EditProfile} />
					<Route exact path='/forgotPass' component={ForgotPass} />
					<AuthRoute exact path='/' component={Home} />
					<AuthRoute exact path='/chatroom' component={Chat} />
					<AuthRoute exact path='/notifications' component={Notifications} />
					<AuthRoute
						exact
						path='/profiledetail/:id'
						component={ProfileDetail}
					/>
					<AuthRoute exact path='/logout' component={Logout} />
					<AuthRoute exact path='/suggestion' component={Suggestion} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
