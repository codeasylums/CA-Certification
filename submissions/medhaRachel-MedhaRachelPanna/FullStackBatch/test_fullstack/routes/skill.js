const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const loginModel = require('../models/loginModel')
router.use(express.static("public"));

const userid = '5f159f594efd4b239416ac89'
router.use('/', function (req, res) {
    gitID = req.body.gitID,
    codeforcesID = req.body.codeforcesID,
    // kaggleID = req.body.kaggleID
    loginModel.updateMany({ _id: userid }, { gitID: gitID, codeforcesID:codeforcesID}).exec()
        .catch(err => { console.log(err) })
})


module.exports = router