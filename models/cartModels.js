const mongoose = require('mongoose')
const User = require('./userModel')
const Product = require('./productModel')

const schema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true,
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Product,
        required : true,
    },
})

const Carts = mongoose.model('Cart', schema)
 
module.exports= Carts