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

module.exports = {
    restUserPassword,
    loginUser,
    registerUser
}
