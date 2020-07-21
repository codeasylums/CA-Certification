const express = require('express')
const router = express.Router();
const app = express();
const mongoose = require('mongoose')

const Register = require('../models/userModel')
router.use(express.static("public"));

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./public/scratch');
  }
   
  localStorage.setItem('myFirstKey', 'myFirstValue');
//   console.log(localStorage.getItem('myFirstKey'));

router.post('/', (req, res, next) => {
    var userName = req.body.userName;
    var password = req.body.password
    Register.findOne({ userName: userName, password: password }, function(err, user) {
        if (err) {
            console.log('Error')
            return res.status(500).redirect('/')
        }
        if (!user) {
            return res.status(404).redirect('/')
        }
        if (user) {
            console.log('successful',userName)
            localStorage.setItem('userName',"panna")
            return res.status(200).redirect('/home')
        }
        if (err)
        {
            console.log(err)
        }

    })

})
const userid = '5f12fe406b7789b7581165d1'

router.get('/showSkill',async(req,res)=>{
    const results=await Register.find({_id:userid});
    console.log(results[0].password)
    return res.send({arrList:results})
})

module.exports = router