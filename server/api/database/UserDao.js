'use strict';
const db = require('../../config/dbConnection');
const hashPwd = require('../utils/hashPwd');
const prepareQuery = require('../utils/prepareQuery');

module.exports = class userDao {

    constructor(userId) {
        this.userId = userId;
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
    return;
}
