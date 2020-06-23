const userService = require('../services/userService/index')

loginUser = (req, res, next) => {
    userService.loginUser.loginUserAuth(req.body.credentials, res);
};

module.exports = {
    loginUser
}
