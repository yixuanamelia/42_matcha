'use strict';
const db = require('../../config/dbConnection');
const prepareQuery = require('../utils/prepareQuery');
const utils = require('./utilsDao');

module.exports = class tagsDao {
    constructor(userId) {
        this.userId = userId;
    }

    async getIntrestsNameByUserId(userId) {
        return new Promise(async (resolve, reject) => {
            let query = "SELECT interests.name FROM user_has_interests INNER JOIN interests \
            ON user_has_interests.interests_id=interests.id WHERE user_has_interests.user_id=?;";
            let preparedQuery = await prepareQuery.prepareQuery(query, [userId])
            let response = await utils.execQuery(preparedQuery);
            resolve(response);
        })
    }

    async getAllTags() {
        return new Promise(async (resolve, reject) => {
            let query = "SELECT * FROM interests WHERE deleted=?";
            let preparedQuery = await prepareQuery.prepareQuery(query, ['0'])
            let response = await utils.execQuery(preparedQuery);
            resolve(response);   
        })
    }
    
}