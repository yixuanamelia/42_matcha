import axios from "axios/index";

export function VisitThisUser(visited_userId, checker) {

    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const visiter_userId = localStorage.getItem("userId");

        axios.post(process.env.REACT_APP_API_URL + "/users/visit", {
            visited_userId: visited_userId,
            visiter_userId: visiter_userId
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