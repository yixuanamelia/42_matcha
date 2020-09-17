import axios from "axios/index";

export function editThisUser(data) {
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const dataHttp = new FormData()
        let i = 0;

        if (data.profilePhoto !== "")
            await dataHttp.append('file', data.profilePhoto, data.profilePhoto.name)

        while (i < data.multiPhotos.length && data.multiPhotos.length > 0) {
            await dataHttp.append('file', data.multiPhotos[i], data.multiPhotos[i].name)
            i++;
        }

        dataHttp.append('firstname', data.firstname);
        dataHttp.append('lastname', data.lastname);
        dataHttp.append('email', data.email);
        dataHttp.append('Password', data.Password);
        dataHttp.append('age', data.age);
        dataHttp.append('psudonym', data.psudonym);
        dataHttp.append('SexualOrientation', data.SexualOrientation);
        dataHttp.append('gender', data.gender);
        dataHttp.append('location', data.location);
        dataHttp.append('Fame', data.Fame);
        dataHttp.append('Bibliography', data.Bibliography);
        dataHttp.append('profilePhoto', data.profilePhoto !== "" ? data.profilePhoto.name : "");
        i = 0;
        if (data.selectedOption === undefined || data.selectedOption === null) {
            data.selectedOption = "";
            await dataHttp.append('tags', data.selectedOption);
        }
        else
            for (i = 0; i < data.selectedOption.length; i++) {
                await dataHttp.append('tags', data.selectedOption[i].value.toLowerCase());
            }

        axios.put(process.env.REACT_APP_API_URL + "/users/" + userId, dataHttp, {
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