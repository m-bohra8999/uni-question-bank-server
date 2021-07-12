const mongoose = require('mongoose')

const paperSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    yearWithSem: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
    },
}, {timestamps: true})

module.exports = mongoose.model('Paper', paperSchema)