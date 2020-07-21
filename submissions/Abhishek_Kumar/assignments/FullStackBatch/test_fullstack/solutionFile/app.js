const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser')
const passport = require('passport');
const path = require('path');
const app = express();

//Config Passport
require('./config/passport')(passport);


//Connect MongoDB
const db = require('./config/keys').mongoURI; //Accuire MongoDB keys
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},)
.then(()=>console.log('MongoDb Connected ')).catch(e=>console.log(e));

//Set Ejs as Templating Engine
app.use(expressLayouts);
app.set('view engine' ,'ejs');


// //Expression-Session MiddleWare
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

//Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());


// //Flash MiddleWare
app.use(flash());


//Global Variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Set Routes
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));

//Default Route
app.get('/login',(req,res)=>{
  res.render('landing');
})

app.listen(3000,console.log('Server stared.....'));



