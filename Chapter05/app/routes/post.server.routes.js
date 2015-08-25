/**
 * Created by akravets on 8/25/15.
 */
var posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app){
    app.route('/posts')
        .post(posts.create)
        .get(posts.list);

    app.route('/posts/:postId')
        .get(posts.read);

    app.param('postId', posts.findByBookId);

};