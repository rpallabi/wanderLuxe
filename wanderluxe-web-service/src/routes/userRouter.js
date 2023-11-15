const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')
const User = require('../model/beanClasses/users')

router.get("/setup", (req, res, next) => {
    setupUser.userSetup().then((data) => {
        res.send(data)
        res.status=200;
    }).catch(err => next(err));
})

//router to login
router.post('/login', function (req, res, next) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    //console.log(contactNo,password);
    
    userservice.login(parseInt(contactNo), password).then(function (userDetails) {
        res.json(userDetails);
        res.status=200;
    }).catch(err => next(err));
})

//Router to Register
router.post('/register', function (req, res, next) {    
    const user=new User(req.body)
    userservice.register(user).then(function (userDetails) {
        res.json(userDetails);
        res.status=200;
    }).catch(err => next(err));
})

//router to get the booking details
router.get('/getBookings/:userId', function (req, res, next) {    
    let userId=req.params.userId;   
    userservice.booking(userId).then(function (bookingDetails) {
        res.json(bookingDetails);
        res.status=200;
    }).catch(err => next(err));
})

//Router to get the Hot Deals
router.post('/hotDeals', function (req, res, next) {    
    let hotId=req.body.hotId;
    
    userservice.booking(hotId).then(function (userDetails) {
        res.json(userDetails);
        res.status=200;
    }).catch(err => next(err));
})
//Router to Pkg details
router.post('/pkgDetails', function (req, res, next) {    
    let pkgId=req.body.userId;
    
    userservice.booking(pkgId).then(function (userDetails) {
        res.json(userDetails);
        res.status=200;
    }).catch(err => next(err));
})

module.exports = router;

