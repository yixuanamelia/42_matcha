'use strict';
const db = require('../../config/dbConnection');
const hashPwd = require('../utils/hashPwd');
const prepareQuery = require('../utils/prepareQuery');

module.exports = class userDao {

    constructor(userId) {
        this.userId = userId;
    }

    execQuery(queryEntiity) {
        return new Promise((resolve, reject) => {
            db.query(queryEntiity, function (error, result) {
                if (error) throw error;
                console.log('QUERY EXECUTED SUCCESSFULLY');
                resolve(result);
            });
        })
    }

    updateActivateAccount(email) {
        return new Promise(async (resolve, reject) => {
            let query = "UPDATE user SET validated=1 WHERE email=?";
            let preparedQuery = await prepareQuery.prepareQuery(query, [email])
            let response = await this.execQuery(preparedQuery);
            if (response.affectedRows !== undefined && response.affectedRows === 1)
                resolve(true);
            else
                resolve(false);
        })
    }

    async activateAccount(email, activationToken) {
        return new Promise(async (resolve, reject) => {
            try {
                if ((await this.userExist(email)) === true)
                    resolve(await this.updateActivateAccount(email));
                else
                    resolve(false)
            } catch (error) {
                resolve(false)
            }

        })
    }

    async getUserByEmailOrUsernameOrId(emailOrUsername) {
        return new Promise(async (resolve, reject) => {
            let query = "SELECT * FROM user WHERE id=? OR email=? OR pseudo=?";
            let preparedQuery = await prepareQuery.prepareQuery(query, [isNaN(parseInt(emailOrUsername)) ? 0 : parseInt(emailOrUsername), emailOrUsername, emailOrUsername])
            let response = await this.execQuery(preparedQuery);
            resolve(response);
        })
    }

    async getAlluserLikedThisUser() {
        return new Promise(async (resolve, reject) => {
            let ids = [];
            let query = "SELECT liker_user_id FROM `user` INNER JOIN `like` on like.has_been_liked_user_id=?;";
            let preparedQuery = await prepareQuery.prepareQuery(query, [parseInt(this.userId)])
            let response = await this.execQuery(preparedQuery);
            ids = response.map(res => {
                return Object.values(res)[0];
            });
            ids = [...new Set(ids)];
            resolve(ids);
        })
    }

    resetPasswod(email) {
        return new Promise(async (resolve, reject) => {
            let newPwd = await hashPwd.generateRandomPassword();
            let response = await this.updateUserPassword(newPwd, email);
            resolve(response === true ?
                newPwd : false);
        })
    }

    updateUserPassword(pwd, email) {
        return new Promise(async (resolve, reject) => {
            let cryptPwd = await hashPwd.hashPassword(pwd);
            let query = "UPDATE user SET password=? WHERE email=? OR pseudo=?";
            let preparedQuery = await prepareQuery.prepareQuery(query, [cryptPwd, email, email])
            let response = await this.execQuery(preparedQuery);
            if (response.affectedRows !== undefined && response.affectedRows === 1)
                resolve(true);
            else
                resolve(false);
        })
    }

    async userExist(emailOrUsernameOruserId) {
        return new Promise(async (resolve, reject) => {
            let query = "SELECT * FROM user WHERE id=? OR email=? OR pseudo=?";
            let preparedQuery = await prepareQuery.prepareQuery(query, [isNaN(parseInt(emailOrUsernameOruserId)) ? 0 : parseInt(emailOrUsernameOruserId), emailOrUsernameOruserId, emailOrUsernameOruserId])
            let response = await this.execQuery(preparedQuery);
            response.length === 0 ? resolve(false) : resolve(true);
        })
    }

    async getAccountValidationToken() {
        return new Promise((resolve, reject) => {
            resolve([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        })
    }

    async insert(data, activationToken) {
        let pwd = await hashPwd.hashPassword(data.password);
        let query = `INSERT INTO user (pseudo, lastname, firstname, password, email, activation_token) \
        VALUES (?, ?, ?, ?, ?, ?)`;
        let preparedQuery = await prepareQuery.prepareQuery(query, [data.pseudonyme, data.lastname, data.firstname, pwd, data.email, activationToken])
        await this.execQuery(preparedQuery);
    }

    is_Numeric(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    }
    
    updateUserOnline(state, userId) {
        return new Promise(async (resolve, reject) => {
            let query = "";
            let preparedQuery = "";
            var date = new Date();
            let infoDate = date.toISOString().split('T')[0] + ' '
                + date.toTimeString().split(' ')[0];

            if (this.is_Numeric(userId)) {
                query = "UPDATE user SET online=?, updatedAt=? WHERE id=?";
                preparedQuery = await prepareQuery.prepareQuery(query, [state, infoDate, userId])
            } else {
                query = "UPDATE user SET online=?, updatedAt=? WHERE email=? OR pseudo=?";
                preparedQuery = await prepareQuery.prepareQuery(query, [state, infoDate, userId, userId])
            }

            let response = await this.execQuery(preparedQuery);
            if (response.affectedRows !== undefined && response.affectedRows === 1)
                resolve(true);
            else
                resolve(false);
        })
    }

    async fetchAllUsers(userId) {
        return new Promise(async (resolve, reject) => {
            let query = "SELECT user.id, pseudo, lastname, firstname, age, bio, gender, sexual_orientation, psycho_type, localisation, fame, user.updatedAt, user.online, GROUP_CONCAT(path) as image_paths, GROUP_CONCAT(state) as image_states, tag_array_string \
            FROM user \
                LEFT JOIN picture \
                ON user.id = picture.user_id  \
                LEFT JOIN (\
                    SELECT user_has_interests.user_id AS user_id, GROUP_CONCAT(interests.name) AS tag_array_string\
                    FROM   user_has_interests \
                    JOIN   interests  ON interests.id = user_has_interests.interests_id \
                    GROUP  BY user_has_interests.user_id \
                ) tmp_tag \
                ON user.id = tmp_tag.user_id\
            WHERE (profile_completion > ?) \
            AND (NOT EXISTS (select 1 from block where block.blocked_user_id = user.id AND block.blocker_user_id = ?))\
            AND (user.id != ?)\
            GROUP BY user.id";
            let preparedQuery = await prepareQuery.prepareQuery(query, [10, userId, userId])
            let response = await this.execQuery(preparedQuery);
            response.forEach(user => {
                let image_array = user.image_paths === null ? [] : user.image_paths.split(',');
                let states = user.image_states === null ? [] : user.image_states.split(',');
                let tmp1 = {};
                let tmp2 = [];
                user.images = tmp1;
                user.images.paths = tmp2;
                for (var i = 0; i < image_array.length; i++) {
                    if (parseInt(states[i]) === 1) {
                        let tmp = image_array[i];
                        user.images.profile_pic = tmp;
                    } else {
                        let tmp3 = image_array[i]
                        user.images.paths.push(tmp3);
                    }
                }
                if (user.tag_array_string !== null) {
                    let tmp5 = user.tag_array_string.split(',');
                    user.tags = tmp5;
                } else {
                    user.tags = [];
                }
                delete user.image_paths;
                delete user.image_states;
                delete user.tag_array_string;
            });

            resolve(response);
        })
    }

}
