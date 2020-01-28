const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    password: {type: String, required: true},
    createdAt: Date,
    updatedAt: Date
});
const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email};
    User.findOne(query, callback)
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch)
    });
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};
