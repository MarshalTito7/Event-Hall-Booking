const asyncHandler = require('express-async-handler')

const Hall = require('../models/hallModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getHalls = asyncHandler(async (req,res) => {
    const halls = await Hall.find()

    res.status(200).json(halls)
})

const getSingleHalls = asyncHandler(async (req,res) => {

    res.status(200).json({message: "Get One Hall"})
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setHall = asyncHandler(async (req,res) => {
    // if (!req.body.text) {
    //     res.status(400)
    //     throw new Error('Please add a text field')
    // }

    // const goal = await Goal.create({
    //     text: req.body.text
    // })

    res.status(200).json({message: "Add Hall"})
})

// @desc    Update goal
// @route   PUT /api/goals/:id
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

// @desc    Delete goal
// @route   DELETE /api/goals/:id
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