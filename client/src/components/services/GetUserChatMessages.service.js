import axios from "axios/index";

export function GetuserChatMsg(dest_userId) {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        axios.get(process.env.REACT_APP_API_URL + "/users/chat/messages/" + userId + "/" + dest_userId, {
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
