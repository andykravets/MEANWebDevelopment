/**
 * Created by akravets on 8/25/15.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        validate: [function (password) {
            return password.length >= 6;
        },
            'Password should be longer'
        ]
    },
    salt: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {}
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({username: username}, callback);
};

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.statics.findUniqueUsername = function (username, suffix, calback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                calback(possibleUsername);
            } else {
                return _this.findOneByUsername(username, (suffix || 0) + 1, calback);
            }
        } else {
            calback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getter: true,
    virtuals: true
});

UserSchema.post('save', function (next) {
    if (this.isNew) {
        console.log('A new user was created.');
    } else {
        console.log('A user updated it\'s details');
    }
});

mongoose.model('User', UserSchema);