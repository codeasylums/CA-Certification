const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Register = require('../models/userModel')

router.post('/', (req, res, next) => {
    const register = new Register({
        _id: new mongoose.Types.ObjectId(),
        fName: req.body.fName,
        lName: req.body.lName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        gitID:'',
        codeforcesID:'',
        kaggleID:''
    })
    register.save()
        .then(result => {
            console.log(result)
            return res.status(201).redirect('/')
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})

module.exports = router