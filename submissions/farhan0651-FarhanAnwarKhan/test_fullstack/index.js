const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const monoose=require('mongoose');

monoose.connect("mongodb+srv://Farhan:0651@cluster0.ugi57.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser:true})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use(express.static("public"));

const coding=require('./routes/Coding');
app.use('/coding',coding);

const development=require('./routes/Development');
app.use('/development',development);

const skill=require('./routes/skill');
app.use('/update',skill);

const login=require('./routes/login');
app.use('/login',login);

const log=require('./routes/users');
app.use('/log',log);

app.get('/',function(req,res){
    res.sendFile(__dirname+'index.html');
})

app.listen(8000,function(req,res)
{
    console.log("Server has started");
})