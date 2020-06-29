const userService = require('../services/userService/index')

loginUser = (req, res, next) => {
    userService.loginUser.loginUserAuth(req.body.credentials, res);
};

registerUser = (req, res, next) => {
    userService.registerUser.registerNewUser(req, res);
}

module.exports = {
    loginUser,
    registerUser
}
