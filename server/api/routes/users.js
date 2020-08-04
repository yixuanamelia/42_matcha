/**
 * Declared dependencies
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const authCkeck = require('../middleware/check-auth');
const userController = require('../controllers/userController');
var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

//=> End of declared dependencies

/**
 * Multer filter the uplaod file via [POST] and/or [GET] request
 */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // Rename the uplaoded file
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Define the extension of the file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


/*
 * API [POST] for roure /users/login 
 */
//TODO bruteforce.prevent
router.post('/login', userController.loginUser);

/*
 * API [POST] for roure /users/register 
 */
router.post('/register', userController.registerUser);

/*
 * API [PUT] for roure /users/resetpwd
 */
router.put('/resetpwd', userController.restUserPassword);

/*
 * API [GET] for roure /users/validateaccount/:token
 */
router.get('/validateaccount/:token', userController.activateUserAccount);

/*
 * API [GET] for roure /users/:userId/user/:sourceUserId
 */
router.get('/:userId/user/:sourceUserId', authCkeck, upload.any(), userController.getProfileInfo);
 
/*
 * API [GET] for roure /users/current/:userId
 */
router.get('/current/:userId', authCkeck, userController.getCurrentProfileInfo);

/*
 * API [GET] for roure /users/publicData/:userId
 */
router.get('/publicData/:userId', userController.fetchAllUsersPublicData);

/*
 * API [GET] for roure /users/interests/:userId
 */
router.get('/interests/:userId', authCkeck, userController.getUserInterests);

module.exports = router;