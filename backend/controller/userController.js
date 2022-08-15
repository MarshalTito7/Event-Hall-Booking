const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler =  require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asynchandler( async(req,res) => {

    const{ name, category, email, password,} = req.body
    // destructuring the body data

    if(!name || !email || !password || !category){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if the user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Now we are gonna hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)


    // create user
    const user = await User.create(
        {
            name,
            category,
            email,
            password: hashedPassword
        }
    )

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            category: user.category,
            email: user.email,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
    
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asynchandler(async (req,res) => {
    const {email, password} = req.body
    
    // Check for user email
    const user = await User.findOne({email})
    
    if (user && await bcrypt.compare(password, user.password))
    // The password is stored in hashed format in the database...the user while logging in provides the normal password and then we need to compare it with the hashed password
    {
        res.json({
            _id: user.id,
            name: user.name,
            category: user.category,
            email: user.email,
            token : generateToken(user._id)
        })
    }   else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
// We will use this to protect the routes
const getMe = asynchandler(async(req,res) => {
    const {_id, name, email, category} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        category,
        email
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
        // This token will expire in 30 days
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}