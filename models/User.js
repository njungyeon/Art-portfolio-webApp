const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    userId: {
        type: String,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    classLevel: {
        type: String
    },
    registerDate: {
        type: Date
    },
    profilePhoto: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String 
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}