require('dotenv').config();

const express = require('express');
const { sql } = require('@vercel/postgres');

const bodyParser = require('body-parser');
const path = require('path');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const bookRouter = require("./routes/book.route");
const mainRouter = require('./routes/main.route');
const userRouter = require('./routes/user.route');

// 1. app
const app = express();
app.use(express.static('public'));

// 2. routes
app.use('/', 	 mainRouter)
app.use('/book', bookRouter)
app.use("/user", userRouter);

app.listen(3001, () => console.log('Server ready on port 3001.'));

module.exports = app;
