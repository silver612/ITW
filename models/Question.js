const mongoose = require('mongoose');
//const Topic = require('./Topic');

const questionSchema = new mongoose.Schema({
    topic:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
    },
    content:{
        type: String,
        required: [true, 'Enter question'],
        unique: true, 
    }
});

const Question = mongoose.model('question', questionSchema);
module.exports = Question;
