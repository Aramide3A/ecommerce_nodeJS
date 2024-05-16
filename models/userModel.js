const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    profile_picture : {
        type : String,
        default: 'default.png',
    },
    password : {
        type : String,
        required : true,
    },
    is_Admin : {
        type : Boolean,
        default : false,
    },
})

const Users = mongoose.model('User', schema) 
module.exports= Users