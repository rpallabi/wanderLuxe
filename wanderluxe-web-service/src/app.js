const express = require('express');
const bodyParser = require('body-parser');

const myErrorLogger = require('./utilities/ErrorLogger');
const myRequestLogger = require('./utilities/RequestLogger');
const userRouter = require('./routes/userRouter');
const packageRouter=require('./routes/packageRouter');
const bookRouter=require('./routes/bookRouter');
const cors = require('cors');
const sendMail=require('./routes/sendMail')
const app = express();
const multer=require('multer')
const path=require('path')

app.use(cors());
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(myRequestLogger);
app.use('/user', userRouter);
app.use('/package', packageRouter);
app.use('/book', bookRouter);
app.use('/',sendMail);
app.use(myErrorLogger);


app.listen(4000);
console.log("Please run http://localhost:4000/user/setup to setup database on browser");
console.log("Server listening in port 4000 ");

module.exports = app;