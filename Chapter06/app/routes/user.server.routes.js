/**
 * Created by akravets on 8/25/15.
 */
var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    app.get('/signout', users.signout)

    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.route('/users/username/:username')
        .get(users.read);

    app.param('userId', users.userByID);
    app.param('username', users.userByUsername)
};