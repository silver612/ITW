const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
});

const Interview = mongoose.model('interview', interviewSchema);
module.exports = Interview;