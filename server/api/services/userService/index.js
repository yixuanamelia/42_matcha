const loginUser = require('./loginUserService');
const registerUser = require('./registerUserService');
const resetPassword = require('./resetPasswordService');
const activateAccount = require('./activateAccountService')
const getUserInfoService = require('./getUserInfoService');
const fetchAllUsersPublicDataService = require('./fetchAllUsersPublicDataService');
const getUserInterestService = require('./getUserInterestService')
const getUserLikesDislikesService = require('./getUserLikesDislikesService');
const updateUserLikesDislikesService = require('./updateUserLikesDislikesService');

module.exports = {
    loginUser,
    resetPassword,
    getUserLikesDislikesService,
    updateUserLikesDislikesService,
    getUserInfoService,
    fetchAllUsersPublicDataService,
    getUserInterestService,
    registerUser,
    activateAccount
}