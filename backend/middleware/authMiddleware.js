const jwt = require('jsonwebtoken')
const asynchandler =  require('express-async-handler')
const User = require('../models/userModel')

const protect = asynchandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            // This splits the authorization token into an array
            // The token is actually in the form of Bearer 134324asdd
            // Here the latter part is of essence and hence we split it into an array

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // The second parameter is the secret key


            // Get user from the token because the token has the user id aas the payload
            req.user = await User.findById(decoded.id).select('-password')
            // The passwor is included however we don't want that hence we use the select function

            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    // We are gonna check the authorizaton header for the request

    if(!token)
    {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }

