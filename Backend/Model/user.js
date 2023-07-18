const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
    },

    picture: {
        type: String,
    },

    jti: {
        type: String,
    },

})

module.exports = mongoose.model('user', userSchema);