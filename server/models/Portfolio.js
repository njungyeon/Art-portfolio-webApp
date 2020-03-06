const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = mongoose.Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    filePath: {
        type: [String]
    },

}, { timestamps: true })

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = { Portfolio }