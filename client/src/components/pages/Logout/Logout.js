import React from "react";
import { createBrowserHistory } from "history";

class Logout extends React.Component {

    async UNSAFE_componentWillMount() {
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