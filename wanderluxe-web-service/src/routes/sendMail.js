const express = require('express');
const router = express.Router();
const sendMail=require('../controller/sendMail')
//router for send email
router.get("/sendEmail",sendMail);

module.exports = router;