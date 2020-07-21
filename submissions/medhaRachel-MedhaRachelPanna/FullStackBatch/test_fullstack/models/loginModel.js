const mongoose=require('mongoose');
const loginSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:
    {
        type: String,
        required: true
    },
    userName:{
        type:String,
        required:true
    },
    gitID:{
        type: String
    },
    codeforcesID: {
        type: String
    },
    email:
    {
        type: String,
        required: true,
        unique:true
    },
    phoneNumber:
    {
        type: Number,
        required: true,
        unique:true
    },
    city:
    {
        type: String,
    },
    password:
    {
        type: String,
        required: true
    }
});
module.exports=mongoose.model('Login',loginSchema);