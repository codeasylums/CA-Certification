const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const loginModel=require('../models/loginModel');

router.get('/',function(req,res){
    res.redirect('/coding.html');
})

router.get('/details', function(req,res){
    loginModel.find()
    .exec()
    .then((user)=>{
        res.json(user).status(200);
    })
})



module.exports=router;