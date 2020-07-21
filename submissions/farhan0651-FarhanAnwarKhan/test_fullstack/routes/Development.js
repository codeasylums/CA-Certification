const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

router.get('/',function(req,res){
    res.redirect('/dev.html');
})




module.exports=router;