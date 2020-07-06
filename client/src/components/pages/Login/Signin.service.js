import axios from "axios/index";

export default function signinUser(data) {
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_API_URL + "/users/login", data)
            .then(results => {
                resolve(results.data);
            })
            .catch(err => {
                resolve(err);
            });
    })
};
