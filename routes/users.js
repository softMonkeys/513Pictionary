var express = require('express');
var router = express.Router();
var db = require('../db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Method for user login */
router.post('/login', function(req, res, next) {
    var loginUsername = req.body.loginUsername;     // get username input
    var loginPassword = req.body.loginPassword;     // get password input

    db.signin(loginUsername,loginPassword,function (status) {

        if(status === 1){
            console.log('------login success------');
            res.render('index',{loginMessage: 'login success', signupMessage: ''});
        }else if(status === 0){
            res.render('index',{loginMessage: 'empty username or password', signupMessage: ''});
        }else {
            console.log('------login failed------');
            res.render('index',{loginMessage: 'login failed', signupMessage: ''});
        }
    });

    // TODO: for now, we only go back to original page, for future we will lead user to his/her home page
    // res.render('index',{loginMessage: '', signupMessage: ''});
});

/* Method for user sign up */
router.post('/signup', function(req, res, next) {
    var signupUsername = req.body.signupUsername;     // get username input
    var signupEmail = req.body.signupEmail;     // get email input
    var signupPassword = req.body.signupPassword;     // get password input
    var message;

    db.signup(signupUsername,signupEmail,signupPassword,function (status) {
        if(status === 0){
            message =  {loginMessage: '', signupMessage: 'empty username, email or password'};     // if empty, prints error message
            res.render('index', message);
        }else if(status === 1){
            message =  {loginMessage: '', signupMessage: 'the username has been taken, please choose another username'};     // if taken, prints error message
            res.render('index', message);
        }else if(status === 2){
            message =  {loginMessage: '', signupMessage: 'success'};
            res.render('index', message);
        }else if(status === 3){
            message =  {loginMessage: '', signupMessage: 'invalid email format'};
            res.render('index', message);
        }else {
            message =  {loginMessage: '', signupMessage: 'unknown-error'};
            res.render('index', message);
        }
    });

    // TODO: for now, we only go back to original page, for future we will lead user to his/her home page
    //res.render('index',{loginMessage: '', signupMessage: ''});
});


module.exports = router;
