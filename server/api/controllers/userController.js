const userService = require('../services/userService/index')

loginUser = (req, res, next) => {
    userService.loginUser.loginUserAuth(req.body, res);
};

registerUser = (req, res, next) => {
    userService.registerUser.registerNewUser(req, res);
}

restUserPassword = (req, res, next) => {
    userService.resetPassword.resetPassword(req.body.emailOrUsername, res)
}

activateUserAccount = (req, res, next) => {
    let activationToken = req.params.token;
    userService.activateAccount.activateAccount(activationToken, res)
}

getProfileInfo = (req, res, next) => {
    let userId = req.params.userId;
    let sourceUserId = req.params.sourceUserId;

    userService.getUserInfoService.getUserInfo(sourceUserId, userId, res);
}


getCurrentProfileInfo = (req, res, next) => {
    let userId = req.params.userId;

    userService.getUserInfoService.getCurrentUserInfo(userId, res);
}

fetchAllUsersPublicData = (req, res, next) => {
    let userId = req.params.userId;
    userService.fetchAllUsersPublicDataService.fetchAllUsersPublicInfo(userId, res);
}


getUserInterests = (req, res, next) => {
    let userId = req.params.userId;
    userService.getUserInterestService.getUserInterest(userId, res);
}

getUserLikesDislikes = (req, res, next) => {
    let userId = req.params.userId;
    userService.getUserLikesDislikesService.getAllUserLikesDislikes(userId, res);
}

updateUserLikesDislikes = (req, res, next) => {
    let checker = req.params.checker;
    userService.updateUserLikesDislikesService.putUserLikesDislikes(checker, req.body, res);
}

module.exports = {
    restUserPassword,
    getUserInterests,
    getUserLikesDislikes,
    updateUserLikesDislikes,
    activateUserAccount,
    getCurrentProfileInfo,
    loginUser,
    fetchAllUsersPublicData,
    getProfileInfo,
    registerUser
}
