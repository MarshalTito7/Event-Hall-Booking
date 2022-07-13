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

    const hall = await Hall.create({
        name: req.body.name,
        address: {
            location: {
                type: "Point",
                coordinates: [23.206504, 88.436259]
                // coordinates: [req.body.coordinates]
            },
            city: req.body.city,
            readableadd: req.body.readableadd,
            pin: req.body.pin
        },
        rate: req.body.rate,
        advcanceamt: req.body.advcanceamt,
        cancellable: req.body.cancellable
    })

    res.status(200).json(hall)
})

// @desc    Update hall
// @access  Private
const updateHall = asyncHandler(async (req,res) => {
    // const goal = await Goal.findById(req.params.id)

    // if (!goal) {
    //     res.status(400)
    //     throw new Error('Goal not found')
    // }

    // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    //     new : true
    //     // This creates a new object if the object does not exist
    // })

    res.status(200).json({message: "Update Hall"})
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