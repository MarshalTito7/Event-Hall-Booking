const asyncHandler = require('express-async-handler')

const Booking = require('../models/bookingModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getBookings = asyncHandler(async (req,res) => {
    const bookings = await Booking.find()

    res.status(200).json(bookings)
})

const getSingleBooking = asyncHandler(async (req,res) => {
    const bookings = await Booking.findById(req.params.id)

    res.status(200).json(bookings)
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setBooking = asyncHandler(async (req,res) => {
    try{
        const booking = await Booking.create(req.body);
        
        return res.status(200).json({
            success: true,
            data: booking
        })
    }
    catch(err){
        console.error(err);
        if(err.code === 1100){
            return res.status(400).json({ error: 'This booking already exists'  })
        }
        res.status(500).json({
            error: 'Server error'
        });
    }
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateBooking = asyncHandler(async (req,res) => {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
        res.status(400)
        throw new Error('Booking not found')
    }

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new : true
        // This creates a new object if the object does not exist
    })

    res.status(200).json(updatedBooking)
})


module.exports = {
    getBookings,
    getSingleBooking,
    setBooking,
    updateBooking
}