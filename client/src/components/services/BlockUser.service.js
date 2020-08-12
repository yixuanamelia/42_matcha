import axios from "axios/index";

export function BlockThisUser(blocked_userId, checker) {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const blocker_userId = localStorage.getItem("userId");
       
        axios.post(process.env.REACT_APP_API_URL + "/users/block", {
            blocked_userId: blocked_userId,
            blocker_userId: blocker_userId
        }, {
            headers: {
                "Authorization": `Bearer ` + token
            }
        })
            .then(results => {
                resolve(results.data)
            })
            .catch(err => {
                resolve(false);
            });
    })
}
