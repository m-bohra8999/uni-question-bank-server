const mongoose = require('mongoose')
const { Schema } = mongoose;

const branchSchema = new Schema({
  name: String,
  yearWithSem:
  {
    11: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
    12: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
    21: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
    22: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
    31: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
    32: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
    41: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
    42: [
      { type: Schema.Types.ObjectId, ref: 'Subject' }
    ],
  },
})

module.exports = mongoose.model('Branch', branchSchema)