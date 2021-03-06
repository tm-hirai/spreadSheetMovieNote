var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const passport =require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET;

console.log(process.env.NODE_ENV)
const callbackURL = process.env.NODE_ENV=="development" ? "http://localhost:3000/auth/google/callback" : "https://fast-dusk-16610.herokuapp.com/auth/google/callback";

// passport
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL
},
  function (accessToken, refreshToken,profile, done) {
    // console.log(profile);
    process.nextTick(function () {
      console.log({accessToken,refreshToken})
      // console.log(profile);
      if (profile) {
        const user={profile,accessToken}
        return done(null,user);
      }else{
        return done(null,false);
      }
    });
  }
));

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var movieRouter = require('./routes/movie');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'Wri-0s@8p7Eswu#+ip@6', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/movie', movieRouter);

app.get('/auth/google',
passport.authenticate('google', { scope: ['profile','https://www.googleapis.com/auth/spreadsheets'] })
  );

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/login', function (req, res) {
  res.redirect('/auth/google');
});
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
