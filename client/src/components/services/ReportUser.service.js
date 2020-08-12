import axios from "axios/index";

export function reportThisUser(reported_userId, checker) {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const reporter_userId = localStorage.getItem("userId");
        
        axios.post(process.env.REACT_APP_API_URL + "/users/report", {
            reported_userId: reported_userId,
            reporter_userId: reporter_userId
        }, {
            headers: {
                "Authorization": `Bearer ` + token
            }
        })
            .then(results => {
                resolve(results.data)
            })
            .catch(err => {
                resolve(false)
            });
    })
}
