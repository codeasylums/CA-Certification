const express= require('express');
const router=express.Router();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');
const auth=require('../auth');

const loginModel=require('../models/loginModel');

router.post('/register',function(req,res){
    const newRegister = new loginModel({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        userName:req.body.userName,
        gitID:'',
        codeforcesID:'',
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        city:'',
        password: bcryptjs.hashSync(req.body.password,10)
    });
    loginModel.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>0)
        res.json("User already existS").status(200);
        else{
            newRegister.save();
            console.log("User registered successfuly");
            res.redirect('/').status(200);
        }
    });
})


router.post('/enter', function(req, res){
    const email=req.body.email;
    loginModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
    console.log(user.email);
   if(user==null)
   {
    res.send("User Does not exists").status(401);
   }
   else
   {
       if(bcryptjs.compareSync(req.body.password,user.password))
       {
           const token=jwt.sign(
               {
                   email:user.email,
                   _id:user._id
               },
               'covid',
               {
                expiresIn:'1h'
               }
           );
           console.log({
               "message":"Authentication Successfull.",
               "token":token
           });
           localStorage.setItem('userName',email);
           res.redirect('/home.html');
        }
        else{
            res.send("Wrong Password Entered").status(401);
        }
   }
})
.catch(err=>{
    res.json(err).status(200);
})
})
router.get('/:email/:password', function(req,res){
    const emailId = req.params.email;
    const pass = req.params.password;
    loginModel.find({email: emailId})
    .exec()
    .then(details =>{
        if(details.length==0){
            res.json(false).status(200);
        }
        else if(pass===details[0].password)
        {
            res.redirect("/medicalPageLoad");
            res.json(true).status(200);
        }
        else{
            res.json(false).status(200);
        }
    })
})

router.get('/details',function(res,req){
    loginModel.find({email:'fk@gmail.com'})
    .exec()
    .then(logins=>{
        res.json(logins.cart).status(200);
    })
})



module.exports=router;