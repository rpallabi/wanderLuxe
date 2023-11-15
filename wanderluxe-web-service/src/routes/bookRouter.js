const express = require('express');
const router = express.Router();
const userservice = require('../service/userslogin')

//router o book 
router.post('/:userId/:destinationId', function (req, res, next) {
    let userId = req.params.userId;
    let destinationId = req.params.destinationId;
    let checkInDate=req.body.checkInDate;
    let noOfPersons=req.body.noOfPersons
    userservice.bookNow(userId,destinationId,checkInDate,noOfPersons).then(function (bookedData) {
        res.json(bookedData);
        res.status=200;
    }).catch(err => next(err));
})

//Router to Register
router.delete('/cancelBooking/:bookingId', function (req, res, next) {
    let bookingId = req.params.bookingId;
    userservice.deleteBooking(bookingId).then(function (deleteData) {
        res.json(deleteData);
        res.status=200;
    }).catch(err => next(err));
})
//router to get the booking details
router.get('/getDetails/:destinationId', function (req, res, next) {    
    let destinationId=req.params.destinationId; 
    userservice.getdetails(destinationId).then(function (pkgDetails) {
        res.json(pkgDetails);
        res.status=200;
    }).catch(err => next(err));
})







module.exports = router;

