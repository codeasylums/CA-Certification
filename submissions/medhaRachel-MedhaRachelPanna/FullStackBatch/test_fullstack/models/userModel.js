const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fName: {
        type: String,
        required:true
    },
    lName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gitID:{
        type: String
    },
    codeforcesID: {
        type: String
    },
    kaggleID: {
        type: String
    }

})

module.exports = mongoose.model('user', userSchema)