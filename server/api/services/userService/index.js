const loginUser = require('./loginUserService');
const registerUser = require('./registerUserService');
const resetPassword = require('./resetPasswordService');
const activateAccount = require('./activateAccountService')
const getUserInfoService = require('./getUserInfoService');

module.exports = {
    loginUser,
    resetPassword,
    getUserInfoService,
    registerUser,
    activateAccount
}