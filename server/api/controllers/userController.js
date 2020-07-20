const userService = require('../services/userService/index')

loginUser = (req, res, next) => {
    
    console.log("Request :", req.body);
    // Check paas
    // Check email
    // NOt
    res.status(200).json({
        msg: "Bad messages"
    })
    // Checl
    
    // userService.loginUser.loginUserAuth(req.body, res);
};

registerUser = (req, res, next) => {
    userService.registerUser.registerNewUser(req, res);
}

module.exports = {
    loginUser,
    registerUser
}
