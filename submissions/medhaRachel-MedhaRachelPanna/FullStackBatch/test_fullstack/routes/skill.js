const express = require('express')
const router = express.Router();
const app = express();
const mongoose = require('mongoose')

const Register = require('../models/userModel')
router.use(express.static("public"));

const userid = '5f12fe406b7789b7581165d1'
router.use('/', function (req, res) {
    gitID = req.body.gitID,
    codeforcesID = req.body.codeforcesID,
    kaggleID = req.body.kaggleID
    Register.updateMany({ _id: userid }, { gitID: gitID, codeforcesID:codeforcesID, kaggleID: kaggleID}).exec()
        .catch(err => { console.log(err) })
})


module.exports = router