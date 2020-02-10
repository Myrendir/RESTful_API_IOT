const passport = require('passport');
const express = require('express');
const app = express();
const User = require("./api//models/userModel");

app.use(passport.initialize());
app.use(passport.session(User));

app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "."));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user.id)

});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user)
    })
});