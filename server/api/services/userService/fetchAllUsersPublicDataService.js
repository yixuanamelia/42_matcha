const UserDao = require('../../database/UserDao');

async function fetchAllUsersPublicInfo(userId, res) {
    try {
        let users = new UserDao();
        let allusers = await users.fetchAllUsers(userId);
        res.status(200).json({
            msg:'Plublic data Users fetched',
            code: 200,
            data: allusers
        })
    } catch (err) {
        res.status(200).json({
            msg:'Plublic data Users fetched',
            code: 500,
            data: err
        })
    }
}

module.exports = {
    fetchAllUsersPublicInfo
}