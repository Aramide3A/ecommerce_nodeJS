const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/userModel')

async function authenticateUser(req, res, next) {
    try {
        const authToken = req.headers['authorization']
        const token = authToken && authToken.split(' ')[1]
        
        if (token === null) {
            return res.status(401).send('Token Expired')
        }
        
        jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(403).send(error)
            }
            
            req.user = user
            
            if (user.is_Admin === false) {
                return res.status(403).send("You dont have the authorization to do this")
            }
            
            next()
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = authenticateUser 