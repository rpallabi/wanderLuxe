const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// What will be the output in console and browser when the user sends a request for URL 
// http://localhost:3000/about with json data {"name":"Albert"} ?
var name = "John";
var middleware1 = (req, res, next) => {
    name = "Emily"; next("invalid name");
}
var middleware2 = (err, req, res, next) => {
    console.log(err.message);
    res.send("something went wrong");
}
app.get('**', (req, res, next) => {
    name = "Maria"; next();
})
app.post('/about', [(req, res, next) => {
    next(); name = req.body.username;
}, middleware1])
let show = (req, res) => { res.send(name); }
app.use(show);
app.use(middleware2);
app.listen(3000, () => {
    console.log("server running on port 3000")
})