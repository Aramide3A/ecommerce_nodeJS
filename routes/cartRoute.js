const express = require('express')
const router = express.Router()
const Products = require('../models/productModel')
const Carts = require('../models/cartModel')
const authenticateUser = require('../middleware/postAuth')

router.get('/',authenticateUser,  async(req, res)=>{
    const cart = await Carts.find({user : req.user.id})
    res.send(cart)
})

router.post('/add/:id',authenticateUser,async(req, res)=>{
    try {
        const products = await Products.findById(req.params.id)
        const cart = new Carts({
            user: req.user.id,
            product: products._id,
        })
        await cart.save()
        res.send(cart)
    } catch (error) {
        res.status(400).send("Unable to save Cart")
        console.log(error)
    }
})

router.delete('/:id/delete', authenticateUser, async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        const cart = await Carts.findOneAndDelete({
            user: req.user.id,
            product: product._id,
        });

        if (!cart) {
            return res.status(404).send("Product not found in cart");
        }

        res.send(`${product.name} removed from cart successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router 