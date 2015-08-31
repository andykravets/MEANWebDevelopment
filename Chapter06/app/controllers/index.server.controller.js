/**
 * Created by akravets on 8/23/15.
 */
exports.render = function(req, res) {
    res.render('index', {
        title: 'Hello World',
        userFullName: req.user ? req.user.fullName : ''
    });
};