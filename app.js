const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();


const adminRouter = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const programmingRoutes = require('./routes/programmingRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const dbURL = 'mongodb+srv://admin2:adminlock2@cluster0.hmfbb.mongodb.net/ITW';//?retryWrites=true&w=majority'
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
  console.log("connected to db");
  app.listen(3000);
  })
.catch((err) => {
  console.log('not connected to db');
  console.log(err);
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());


app.get('*', checkUser);
app.get('/', (req, res) =>{ res.render('home',{ title: "Home"}); });


app.use('/programming', requireAuth, programmingRoutes);
app.use(authRoutes);
app.use('/interviews', interviewRoutes);
app.use('/admin', adminRouter);

app.use((req,res) =>{ res.status(404).render("404", { title: '404'}); });