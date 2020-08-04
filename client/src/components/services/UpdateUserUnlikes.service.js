import axios from "axios/index";

export function PutUpdateUserUnlikes(unliked_userId) {

    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        axios.post(process.env.REACT_APP_API_URL + "/users/unlikes", {
            unliker_user_id: userId,
            has_been_unliked_user_id: unliked_userId
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