require("dotenv").config();
require('module-alias/register');
var Express = require("express");
var path = require("path");
const cors = require('cors');
const jwt = require('@src/_helpers/jwt');
const errorHandler = require('@src/_helpers/error-handler');
const { connectDB } = require("@root/db.config");
var app = Express();

let port = process.env.PORT || 9999;

app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(jwt());
app.use(cors());
app.set('views', path.join(__dirname, '/views'));

connectDB(process.env.MONGODB)


app.use('/users', require("./models/User.controller"));

app.use(errorHandler);

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Listening to port ${port}`);
})