const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = express.Router();
const Register = require('./models/userModel')

const userRoutes = require('./routes/users')
const registerRoutes = require('./routes/register')
const skillRoutes = require('./routes/skill')

mongoose.connect('mongodb+srv://medha:medha@cluster0.mr1wn.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true })


app.use(morgan('dev'))
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/log', userRoutes);
app.use('/reg', registerRoutes);
app.use('/update', skillRoutes);

app.get('/', function(req, res) {
    res.sendFile(__dirname + 'index.html')
});

app.get('/home', function(req, res) {
    console.log("entered")
    console.log(localStorage.getItem('userName'));
    res.sendFile(__dirname + '/public/profile.html')
});


module.exports = app