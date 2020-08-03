'use strict';
const db = require('../../config/dbConnection');
const prepareQuery = require('../utils/prepareQuery');
const utils = require('./utilsDao');

module.exports = class likeDao {

    constructor(userId) {
        this.userId = userId;
    }

    async userLikeExist(likerId, likedId) {
        return new Promise(async (resolve, reject) => {
            let query = "SELECT count(*) as likeExist FROM `like` WHERE has_been_liked_user_id=? AND liker_user_id=?";
            let preparedQuery = await prepareQuery.prepareQuery(query, [parseInt(likedId), parseInt(likerId)])
            let response = await utils.execQuery(preparedQuery);
            response[0].likeExist === 0 ? resolve(false)
                : resolve(true);
        })
    }
}