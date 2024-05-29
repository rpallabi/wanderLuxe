const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')
const User = require('../model/beanClasses/users')
const HotDeal = require('../model/beanClasses/hotDeal')
const Pkg = require('../model/beanClasses/pkgModel')
const multer = require('multer')
const path = require('path')
let imageName = ''
router.get("/setup", (req, res, next) => {
    setupUser.userSetup().then((data) => {
        res.send(data)
        res.status = 200;
    }).catch(err => next(err));
})

//Router to get the Hot Deals
router.get('/hotDeals', function (req, res, next) {
    userservice.hotDeals().then(function (hotDeals) {
        res.json(hotDeals);
        res.status = 200;
    }).catch(err => next(err));
})
//Router to Pkg details
router.get('/destinations', function (req, res, next) {
    userservice.destinations().then(function (destination) {
        res.json(destination);
        res.status = 200;
    }).catch(err => next(err));
})
//router for search
router.get('/destinations/:continent', function (req, res, next) {
    let continent = req.params.continent;
    userservice.getSearch(continent).then(function (getSearchData) {
        res.json(getSearchData);
        res.status = 200;
    }).catch(err => next(err));
})
//add new Hotdeal
router.post('/hotDeals', function (req, res, next) {
    // hotdeal = new HotDeal(req.body);
    // userservice.pushHotDeals(hotdeal).then(function (deal) {
    //     res.json(deal);
    //     res.status = 200;
    // }).catch(err => next(err))
    const pkgs = new HotDeal(req.body); 
    
    pkgs.imageUrl = 'assets/'+imageName; 
    console.log(imageName);
    console.log(pkgs.imageUrl);
    // console.log(hotDeal);
    userservice.pushHotDeals(pkgs)
        .then(function (deal) {
            res.status(200).json(deal); // Set status before sending response
        })
        .catch(err => next(err));
})
//add new Package=================================================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets')
    }, filename: (req, file, cb) => {
        cb(null, 'pkg' + "_" + Date.now() + path.extname(file.originalname))
    }

})
const upload = multer({
    storage: storage
})
//===============================================================================
router.post('/upload', upload.single('file'), (req, res, next) => {
    // console.log(req.file);
    if (req.file) {
        imageName=req.file.filename
        res.status(200).json(req.file);
    } else {
        next();
    }
});
router.post('/package', function (req, res, next) {
    const pkgs = new HotDeal(req.body); 
    
    pkgs.imageUrl = 'assets/'+imageName; 
    console.log(imageName);
    console.log(pkgs.imageUrl);
    // console.log(hotDeal);
    userservice.pushPackages(pkgs)
        .then(function (deal) {
            res.status(200).json(deal); // Set status before sending response
        })
        .catch(err => next(err));
});

router.delete('/hotDeals/:hdid', function (req, res, next) {
    let hotdeal = req.params.hdid;
    userservice.deleteHotDeals(hotdeal).then(function (deal) {
        res.json(deal);
        res.status = 200;
    }).catch(err => next(err))
})
//delete a Package
router.delete('/package/:pkgid', function (req, res, next) {
    let pkg = req.params.pkgid;
    userservice.deletePackages(pkg).then(function (deal) {
        res.json(deal);
        res.status = 200;
    }).catch(err => next(err))
})
//post image

module.exports = router;

