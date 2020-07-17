"use strict";
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var server = require('express');
var apiRouter = require('./routers/api.router');
var app = server();
app.set('env', 'prod');
app.use(logger('common')); // Apache common log style
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/api', apiRouter);
// catch catch all and pass to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, _) {
    var status;
    var object;
    if (err.status) {
        status = 404;
        object = {
            response: {
                message: 'Not found.'
            }
        };
    }
    else {
        status = 500;
        object = {
            response: {
                message: 'Server error.'
            }
        };
    }
    // log errors
    console.log(err.stack);
    // respond
    res.status(status).json(object);
});
// export the app module
module.exports = app;
