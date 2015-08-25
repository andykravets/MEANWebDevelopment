/**
 * Created by akravets on 8/25/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {
        type: String,
        required: true
    }, content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Post', PostSchema);