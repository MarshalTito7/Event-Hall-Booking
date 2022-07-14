const asyncHandler = require('express-async-handler')

const Hall = require('../models/hallModel')

// @desc    Get halls
// @access  Private
const getHalls = asyncHandler(async (req,res) => {
    const halls = await Hall.find()

    res.status(200).json(halls)
})

const getSingleHalls = asyncHandler(async (req,res) => {
    const hall = await Hall.findById(req.params.id)

    res.status(200).json(hall)
})

// @desc    Set halls
// @access  Private
const setHall = asyncHandler(async (req,res) => {

    try{
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
})

// @desc    Search for a nearby hall
// @access  Private
const searchLoc = asyncHandler(async (req,res) => {

    res.status(200).json({message: "Search for nearby Location"})
})

module.exports = {
    getHalls,
    getSingleHalls,
    setHall,
    updateHall,
    searchLoc 
}