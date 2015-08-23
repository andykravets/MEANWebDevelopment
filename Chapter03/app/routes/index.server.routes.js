/**
 * Created by akravets on 8/23/15.
 */
module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
}