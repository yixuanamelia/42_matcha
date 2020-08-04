import axios from "axios/index";

export function PutUpdateUserLikes(liked_userId, checker) {
    return new Promise(async (resolve, reject) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        axios.post(process.env.REACT_APP_API_URL + "/users/likes/" + checker, {
            liker_user_id: userId,
            has_been_liked_user_id: liked_userId
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