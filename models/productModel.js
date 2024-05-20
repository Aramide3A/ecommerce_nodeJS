const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    product_picture : {
        type : [String],
        default :[],
    },
    description : {
        type : String,
    },
})

const Products = mongoose.model('Product', schema) 
module.exports= Products