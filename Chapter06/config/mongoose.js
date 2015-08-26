/**
 * Created by akravets on 8/25/15.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model');

    return db;
};