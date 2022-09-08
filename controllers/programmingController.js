const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const Question = require('../models/Question');

module.exports.topics_get =  (req,res) =>{
    Topic.find().sort()
      .then((result) =>{
        res.render('questions/topics-list', {title: "All topics", topics: result});
      })
      .catch((err) =>{
        console.log(err);
      });
};

module.exports.questions_post = async (req,res) =>{
    
    //find the position of the topic after creation
    let topic; 
    await Topic.findOne( { title:  req.body.title }, function (err, doc){
        if(err) console.log(err);
        topic = doc;
    });
    //add question to db
    const question = new Question({topic:topic._id, content:req.body.content});
    question.save()
    .then((result) =>{
        console.log("Question created:", question);
        Question.findOne({content:req.body.content}, function (err, result){
            if(err) console.log(err);
            result.topic = topic;
            console.log("Topic = ", result.topic.title);
        });
        res.redirect('/programming');
    })
    .catch((err) =>{
        console.log(err);
    });
};

module.exports.questions_ask_get = async (req,res) =>{
    res.locals.topics = await Topic.find();
    res.render('questions/question-ask', {title:'Ask your question'});
};

module.exports.question_details_get = (req,res) =>{
    const Id = req.params.id;
    Question.findById(Id)
    .then(result =>{
        res.render("questions/question-details", {question:result, title:"question details"});
    })
    .catch((err) =>{
        console.log(err);
    });
};

module.exports.question_delete = (req,res) =>{
    const Id = req.params.id;
    Question.findByIdAndDelete(Id)
    .then(result =>{
        res.json({ redirect: '/programming' });
    })
    .catch((err) =>{
        console.log(err);
    });
};

module.exports.topic_create_get = (req,res) => {
    res.render("questions/topic-create", {title:'Create a topic'});
}

module.exports.topic_create_post = async (req, res) => {
    await Topic.findOne( { title:  req.body.title }, function (err, result){
        if(err) console.log(err);
        if(result)
            res.redirect('/programming/ask');
    }); 
    const newTopic = new Topic({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title
    });
    newTopic.save()
    .then((result) =>{
        console.log("Topic created");
        res.redirect('/programming/ask');
    })
    .catch((err) =>{
        console.log(err);
    });
}

module.exports.topic_questions_get =  (req,res) =>{
    const Id = req.params.id;
    Topic.findById(Id)
    .then(result =>{
        Question.find({topic:result}).sort({content:1}).exec((err, questions) =>{
            if(err) console.log(err);
            res.locals.questions = questions;
            res.render('questions/question-list',{topic:result.title, title:"Questions"});
        });
    })
    .catch((err) =>{
        console.log(err);
    });
};