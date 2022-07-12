const asyncHandler = require('express-async-handler')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getBookings = asyncHandler(async (req,res) => {

    res.status(200).json({message: "Get Bookings"})
})

const getSingleBooking = asyncHandler(async (req,res) => {

    res.status(200).json({message: "Get One Booking"})
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setBooking = asyncHandler(async (req,res) => {
    // if (!req.body.text) {
    //     res.status(400)
    //     throw new Error('Please add a text field')
    // }

    // const goal = await Goal.create({
    //     text: req.body.text
    // })

    res.status(200).json({message: "Add Booking"})
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateBooking = asyncHandler(async (req,res) => {
    // const goal = await Goal.findById(req.params.id)

    // if (!goal) {
    //     res.status(400)
    //     throw new Error('Goal not found')
    // }

    // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    //     new : true
    //     // This creates a new object if the object does not exist
    // })

    res.status(200).json({message: "Update Booking"})
})


module.exports = {
    getBookings,
    getSingleBooking,
    setBooking,
    updateBooking
}