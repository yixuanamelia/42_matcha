import axios from "axios/index";

export function GetUserInfo(userId) {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const sourceUserId = localStorage.getItem("userId");

        axios.get(process.env.REACT_APP_API_URL + "/users/" + userId + "/user/" + sourceUserId, {
            headers: {
                "Authorization": `Bearer ` + token
            }
        })
            .then(results => {
                resolve(results.data);
            })
            .catch(err => {
                resolve(false);
            });
    })
}