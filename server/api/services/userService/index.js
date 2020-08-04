const loginUser = require('./loginUserService');
const registerUser = require('./registerUserService');
const resetPassword = require('./resetPasswordService');
const activateAccount = require('./activateAccountService')
const getUserInfoService = require('./getUserInfoService');
const fetchAllUsersPublicDataService = require('./fetchAllUsersPublicDataService');
const getUserInterestService = require('./getUserInterestService')

module.exports = {
    loginUser,
    resetPassword,
    getUserInfoService,
    fetchAllUsersPublicDataService,
    getUserInterestService,
    registerUser,
    activateAccount
}