/* global __dirname */

var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());



app.locals.ini = null;
app.locals.page = 1;
app.locals.pages = 1;
app.locals.ab = "A";

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/ab/:ab', (req, res) => {
    if (req.params.ab === "a") {
        app.locals.ab = "A";
    } else {
        app.locals.ab = "B";
    }
    res.render('pages/home');
});

app.get('/number/:value', (req, res) => {
    app.locals.ini = parseInt(req.params.value);
    app.locals.pages = Math.ceil(app.locals.ini / 3);
    app.locals.page = 1;
    res.render('pages/home');
});

app.get('/next/:page', (req, res) => {
    if (req.params.page === "next") {
        if (app.locals.page <= app.locals.pages-1) {
            app.locals.page = (app.locals.page + 1);
        };
    } else {
        if (app.locals.page >= 2) {
            app.locals.page = (app.locals.page - 1);
        };
    };
    res.render('pages/home');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
