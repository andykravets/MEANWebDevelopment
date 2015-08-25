/**
 * Created by akravets on 8/25/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        validate: [function (password) {
            return password.length >= 6;
        },
            'Password should be longer']
    },
    created: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', "User"]
    },
    website: {
        type: String,
        set: function (url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }

                return url;
            }
        },
        get: function (url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }

                return url;
            }
        }
    }
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({username: username}, callback);
};

UserSchema.method.authenticate = function (password) {
    return this.password === password;
};

UserSchema.pre('save', function(next){
    console.log('Function before save');
});

UserSchema.post('save', function(next){
    if(this.isNew){
        console.log('A new user was created.');
    } else {
        console.log('A user updated it\'s details');
    }
});

mongoose.model('User', UserSchema);