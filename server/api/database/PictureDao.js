'use strict';
const db = require('../../config/dbConnection');
const prepareQuery = require('../utils/prepareQuery');
const utils = require('./utilsDao');

module.exports = class pictureDao {

    constructor(userId) {
        this.userId = userId;
    }


    async getPicturesByUserId(userId) {
        return new Promise(async (resolve, reject) => {
            let query = "SELECT picture.path, picture.state FROM picture WHERE user_id=?";
            let preparedQuery = await prepareQuery.prepareQuery(query, [userId])
            let response = await utils.execQuery(preparedQuery);
            resolve(response);
        })
    }
}