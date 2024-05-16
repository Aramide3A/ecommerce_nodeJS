const express = require('express')
const Joi = require('joi')
const router = express.Router()
const Products = require('../models/productModel')
const authenticateToken = require('../middleware/auth')
const upload = require('../middleware/image')
const authenticateUser = require('../middleware/postAuth')

function Validate(product){
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.string().min(2).required(),
        quantity: Joi.string().min(1).required(),
        description: Joi.string().min(2).required(),
        picture: Joi.string().min(2),
    })

    return schema.validate(product)
}

router.get('/', async(req, res)=>{
    const product = await Products.find()
    res.send(product)
})

router.post('/add',[authenticateUser, upload.single('product_image')], async(req, res)=>{
    const {error} = Validate(req.body)
    if (error){
        return res.send(error.details[0].message)
    }
    try {
        const product = new Products({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            product_picture: req.file.filename,
        })
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(400).send("Unable to save Product")
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const product = await Products.findById(req.params.id)
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); 
    }
})

router.put('/:id', authenticateUser, async(req, res)=>{
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); 
    }
})

router.delete('/delete/:id', authenticateUser, async(req, res)=>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(`${product.name} deleted successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router 