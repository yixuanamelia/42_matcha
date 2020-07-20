const userService = require('../services/userService/index')

loginUser = (req, res, next) => {
    userService.loginUser.loginUserAuth(req.body, res);
    // res.status(401).json({
    //     token: "sadasdasd"
    // });
};

registerUser = (req, res, next) => {
    userService.registerUser.registerNewUser(req, res);
}

module.exports = {
    loginUser,
    registerUser
}
