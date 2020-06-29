import axios from "axios/index";

export default function signupUser(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_API_URL + "/users/register", data)
            .then(results => {
                resolve(results.data);
            })
            .catch(err => {
                resolve(err);
            });
    })
};