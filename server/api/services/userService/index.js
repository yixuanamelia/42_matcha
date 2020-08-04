const loginUser = require('./loginUserService');
const registerUser = require('./registerUserService');
const resetPassword = require('./resetPasswordService');
const activateAccount = require('./activateAccountService')
const getUserInfoService = require('./getUserInfoService');
const fetchAllUsersPublicDataService = require('./fetchAllUsersPublicDataService');

module.exports = {
    loginUser,
    resetPassword,
    getUserInfoService,
    fetchAllUsersPublicDataService,
    registerUser,
    activateAccount
}