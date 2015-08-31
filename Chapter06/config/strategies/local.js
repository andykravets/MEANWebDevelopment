/**
 * Created by akravets on 8/26/15.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Login or password is incorrect'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Login or password is incorrect'
                });
            }

            return done(null, user);
        });
    }));
};