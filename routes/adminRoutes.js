const mongoose = require('mongoose');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose'); 
AdminBro.registerAdapter(AdminBroMongoose);

const User = mongoose.model('User', { username:String, email:String, password:String});
const Interview =  mongoose.model('Interview', { title:String, year:Number, body:String});
const Question = mongoose.model('Question', { topic:mongoose.Schema.Types.ObjectId, content:String});
const Topic = mongoose.model('Topic', { title:String});

const adminBro = new AdminBro({
    databases:[mongoose],
    rootPath:'/admin',
    resources: [User, Interview, Question, Topic]
  });

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;