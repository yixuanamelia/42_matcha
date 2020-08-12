import axios from "axios/index";

export function saveUserChatAction(data) {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");

        axios.post(process.env.REACT_APP_API_URL + "/users/chat", data, {
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