/**
 * Created by akravets on 8/25/15.
 */
var Post = require('mongoose').model('Post');

exports.create = function (req, res, next) {
    var post = new Post(req.body);
    post.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(post);
        }
    });
};

exports.findByBookId = function (req, res, next, id) {
    Post.findOne({_id: id},
        function (err, post) {
            if (err) return next(err);
        }).populate('author').exec(function (err, posts) {
            if (err) return next(err);
            else {
                req.post = post;
                next();
            }
        });
};

exports.list = function (req, res, next) {
    Post.find({}, function (err, posts) {
        if (err) return next(err);
    }).populate('author').exec(function (err, posts) {
        if (err) return next(err);
        else res.json(posts);
    })
};

exports.read = function (req, res) {
    return res.json(req.post);
};