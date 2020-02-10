const LocalStrategy = require('passport-local').Strategy;
const passport = require('./passport');
const app = require('./app');
passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDetails.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false);
            }

            if (user.password !== password) {
                return done(null, false);
            }
            return done(null, user);

        });

    }
));
app.post('/',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect('/success?username='+req.user.username);
    });