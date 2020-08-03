const loginUser = require('./loginUserService');
const registerUser = require('./registerUserService');
const resetPassword = require('./resetPasswordService');
const activateAccount = require('./activateAccountService')

module.exports = {
    loginUser,
    resetPassword,
    registerUser,
    activateAccount
}