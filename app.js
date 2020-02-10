const express = require('express');
const app = express();
const morgan = require('morgan');
const User = require('./api/models/userModel');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const userRoute = require('./api/routes/userRoute.js');
const error_handler = require('./api/middleware/error_handler');
mongoose.connect("mongodb+srv://DevMyrRoot:ac43BgpxAvlm2EP9EheX@cluster0-86rki.mongodb.net/PasTrack?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.Promise = global.Promise;
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function (email, password, done) {
        User.getUserByEmail(email, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User.'})
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Invalid Password.'});
                }
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id)

});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

app.get('/user', function (req, res) {
    res.send(req.user);
});

app.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.send(req.user);
    }
);
app.get('/logout', function (req, res) {
    req.logout();
    res.send(null);

});



app.use('/user', userRoute);

app.use(error_handler);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
