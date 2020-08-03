import axios from "axios/index";

export function ResetPwdUser(emailOrUsername) {
    return new Promise((resolve, reject) => {
        axios.put(process.env.REACT_APP_API_URL + "/users/resetpwd", {
            "emailOrUsername": emailOrUsername,
        }, { 'content-type': 'application/x-www-form-urlencoded' })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                resolve(false)
            });
    })

};