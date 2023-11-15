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

//Router to get the Hot Deals
router.get('/hotDeals', function (req, res, next) {    
    userservice.hotDeals().then(function (hotDeals) {
        res.json(hotDeals);
        res.status=200;
    }).catch(err => next(err));
})
//Router to Pkg details
router.get('/destinations', function (req, res, next) {    
    userservice.destinations().then(function (destination) {
        res.json(destination);
        res.status=200;
    }).catch(err => next(err));
})
//router for search
router.get('/destinations/:continent', function (req, res, next) {
    let continent = req.params.continent;
    userservice.getSearch(continent).then(function (getSearchData) {
        res.json(getSearchData);
        res.status=200;
    }).catch(err => next(err));
})

module.exports = router;

