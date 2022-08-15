const asyncHandler = require('express-async-handler')
const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
})

const Hall = require('../models/hallModel')

// @desc    Get halls
// @access  Private
const getHalls = asyncHandler(async (req,res) => {
    try {
        const { authorization } = req.headers
        if (!authorization) throw new Error('You must send an Authorization header')
    
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    
        await oktaJwtVerifier.verifyAccessToken(token)
   
        const halls = await Hall.find()
        
        res.status(200).json(halls)
    }catch (error) {
        res.json({ error: error.message })
    }
})

const getSingleHalls = asyncHandler(async (req,res) => {
    try {
        const { authorization } = req.headers
        if (!authorization) throw new Error('You must send an Authorization header')
    
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    
        await oktaJwtVerifier.verifyAccessToken(token)

        const hall = await Hall.findById(req.params.id)

        res.status(200).json(hall)
    }
    catch (error) {
        res.json({ error: error.message })
    }
})

// @desc    Set halls
// @access  Private
const setHall = asyncHandler(async (req,res) => {

    try{
        const { authorization } = req.headers
        if (!authorization) throw new Error('You must send an Authorization header')
    
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    
        await oktaJwtVerifier.verifyAccessToken(token)

        const hall = await Hall.create(req.body);
        
        return res.status(200).json({
            success: true,
            data: hall
        })
    }
    catch(err){
        console.error(err);
        if(err.code === 1100){
            return res.status(400).json({ error: 'This hall already exists'  })
        }
        res.status(500).json({
            error: 'Server error'
        });
    }
})

// @desc    Update hall
// @access  Private
const updateHall = asyncHandler(async (req,res) => {
    try{
        const { authorization } = req.headers
        if (!authorization) throw new Error('You must send an Authorization header')
    
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    
        await oktaJwtVerifier.verifyAccessToken(token)
    
        const hall = await Hall.findById(req.params.id)

        if (!hall) {
            res.status(400)
            throw new Error('Hall not found')
        }

        const updatedHall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
            new : true
            // This creates a new object if the object does not exist
        })

        res.status(200).json(updatedHall)
    }
    catch (error) {
        res.json({ error: error.message })
    }
})

// @desc    Search for a nearby hall
// @access  Private
const searchLoc = asyncHandler(async (req,res) => {
    try{
        const { authorization } = req.headers
        if (!authorization) throw new Error('You must send an Authorization header')
    
        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    
        await oktaJwtVerifier.verifyAccessToken(token)

        const halls = await Hall.find({location:
            { $near:
                {
                    $geometry: req.body.loc,
                    $minDistance: req.body.min,
                    $maxDistance: req.body.max
                }
            }
        })

        res.status(200).json(halls)
    }
    catch (error) {
        res.json({ error: error.message })
    }
})

module.exports = {
    getHalls,
    getSingleHalls,
    setHall,
    updateHall,
    searchLoc 
}