/**
 * Created by akravets on 8/25/15.
 */
var users = require('../../app/controllers/users.server.controller');

module.exports = function (app) {
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