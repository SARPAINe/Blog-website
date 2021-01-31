//jshint esversion:6
const path=require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv=require('dotenv');
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const app = express();
const connectDB=require('./config/db');
const session=require('express-session');
const passport =require('passport'); 
const LocalStrategy = require("passport-local");

dotenv.config({path:'./config/config.env'});

//set vie engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//set public folder
app.use(express.static(path.join(__dirname,"public")));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//set global errors variables
app.locals.errors=null;

const MongoStore = require('connect-mongo')(session);

//express session middleware
app.use(session({
  secret:process.env.secret, 
  resave:false,
  saveUninitialized:true,
  store:new MongoStore({mongooseConnection:mongoose.connection})
}))

//passport
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());


//connect to database
connectDB();

app.get("*",(req,res,next)=>{
  //cart will be available on every get request because of this below line
  res.locals.user=req.user || null;
  next();
});

//Routes
app.use('/',require('./routes/home'));
app.use('/admin',require('./routes/admin'));
app.use('/posts',require('./routes/posts'));
app.use('/users',require('./routes/users'));

const PORT =process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${process.env.NODE_ENV} mode on port ${PORT}!`); 
});
