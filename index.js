const express = require('express')
const app = express()
const cart = require('./routes/cartRoute')
const auth = require('./routes/authRoute')
const product = require('./routes/productRoute')
const mongoose = require('mongoose')
require('dotenv').config
const cors = require('cors')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/auth', auth)
app.use('/api/products', product)
app.use('/api/cart', cart)


app.listen(3000, ()=>{
    console.log("server running")
})

const MongoURI = process.env.Mongo_URI
try {
    mongoose.connect(MongoURI)
    console.log('Database Running Successfully')
} catch (error) {
    console.log(error)
}