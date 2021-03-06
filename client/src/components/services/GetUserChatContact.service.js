import axios from "axios/index";

export function GetuserChatContact() {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        axios.get(process.env.REACT_APP_API_URL + "/users/chat/" + userId, {
            headers: {
                "Authorization": `Bearer ` + token
            }
        })
            .then(results => {
                resolve(results.data)
            })
            .catch(err => {
                resolve("")
            });
    })
}
