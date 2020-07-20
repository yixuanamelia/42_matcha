import axios from "axios/index";
import { createBrowserHistory } from "history";

export default function signinUser(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_API_URL + "/users/login", data)
            .then(results => {
                if (results.data.code === 200) {
                    let history = createBrowserHistory();
                    localStorage.setItem('token', results.data.token);
                    localStorage.setItem('userId', results.data.userId);
                    history.push("/");
                    let urlPath = window.location.href;
                    window.location.href = urlPath;

                } else {
                    resolve(results.data);
                }
            })
            .catch(err => {
                resolve(err);
            });
    })
};


