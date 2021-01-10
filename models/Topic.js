const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required: [true, 'Enter topic'],
    }
});

const Topic = mongoose.model('topic', topicSchema);

module.exports = Topic;
