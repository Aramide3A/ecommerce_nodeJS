const express = require('express')
require('dotenv').config()
const router = express()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const upload = require('../middleware/image')

function validateRegister(user){
    const schema= Joi.object({
        name : Joi.string().min(3).required(),
        phone : Joi.number().min(3).required(),
        picture: Joi.string().min(3),
        email : Joi.string().email().min(3).required(),
        password: Joi.string().min(3).required(),
    })
    return schema.validate(user)
}

function validateLogin(user){
    const schema= Joi.object({
        email : Joi.string().email().min(3).required(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(user)
}

router.post('/register',upload.single('profile_picture'), async(req, res)=>{
    const {error}= validateRegister(req.body)
    if(error) return  res.status(400).send(error.details[0].message)
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        profile_picture: req.file.filename,
        password: hashedpassword,
        is_Admin : req.body.is_Admin,
    })
    await user.save()
    const payload = {id : user._id, name: user.username, is_Admin:user.is_Admin,}
    const token = jwt.sign(payload, process.env.SECRET_KEY)
    res.send(token)
})

router.post('/login', async(req, res)=>{
    const {error}= validateLogin(req.body)
    if(error) return  res.status(400).send(error.details[0].message)
    const user =await User.findOne({email : req.body.email})
    if (!user) return res.status(400).send('Invalid Login Parameters')
    if(await bcrypt.compare(req.body.password, user.password)){
        const payload = {id : user._id, name: user.username, is_Admin:user.is_Admin,}
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.send(token)
    }
    else{
        res.status(400).send('Invalid login parameters')
    }
})

module.exports = router 