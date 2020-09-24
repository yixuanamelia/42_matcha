import React from "react";
import { createBrowserHistory } from "history";
import { UserLogout } from "../../services/UserLogout.service";

class Logout extends React.Component {

    async UNSAFE_componentWillMount() {
        await UserLogout();
        let history = createBrowserHistory();
        localStorage.setItem('token', "");
        localStorage.setItem('userId', "");
        history.push("/login");
        let pathUrl = window.location.href;
        window.location.href = pathUrl; 
    }

    render() {
        
        return (
            <div>
            </div>
        );
    }
}

export default Logout;