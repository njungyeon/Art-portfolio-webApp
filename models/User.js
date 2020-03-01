const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        maxlength: 50
    },
    userId: {
        type: String,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
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