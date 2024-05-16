const express = require('express')
const app = express()
const cart = require('./routes/cartRoute')
const auth = require('./routes/authRoute')
const product = require('./routes/productRoute')
const mongoose = require('mongoose')
require('dotenv').config

app.use(express.static('public'))
app.use(express.json())
app.use('/auth', auth)
app.use('/api/products', product)
app.use('/api/cart', cart)


app.listen(3000, ()=>{
    console.log("server running")
})

const Mongo_URI = process.env.Mongo_URI
try {
    mongoose.connect(Mongo_URI)
    console.log('Database Running Successfully')
} catch (error) {
    console.log(error)
}