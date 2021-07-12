const mongoose = require('mongoose')
const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: String,
  code: String
})

module.exports = mongoose.model('Subject', subjectSchema);