import axios from "axios/index";

export function getUserLocation() {
    return new Promise(async (resolve, reject) => {
        axios.get("http://ip-api.com/json")
            .then(response => {
                resolve(response.data.lat + "," + response.data.lon)
            })
            .catch(err => {
                resolve("")
            });
    })
}