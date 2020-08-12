import axios from "axios/index";

function getUserLikes(userId)  {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");

        axios.get(process.env.REACT_APP_API_URL + "/users/likes/" + userId, {
            headers: {
                "Authorization": `Bearer ` + token
            }
        })
            .then(results => {
                resolve(results.data)
            })
            .catch(err => {
                resolve("");
            });
    })
}

export default getUserLikes;