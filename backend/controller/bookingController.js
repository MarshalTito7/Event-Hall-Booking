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
        const bookings = await Booking.find(
            {
                $and: [
                    {
                        hallId: req.body.hallId
                    },
                    {
                        $or:[
                            {
                                startDate:{
                                    $gte:new Date(req.body.startDate),
                                    $lte: new Date(req.body.endDate)
                                }
                            },
                            {
                                endDate:{
                                    $gte:new Date(req.body.startDate),
                                    $lte: new Date(req.body.endDate)
                                }
                            }
                        ]
                    }
                ]
            }
        )
        if(bookings.length == 0)
        {
            const booking = await Booking.create(req.body);
            
            return res.status(200).json({
                success: true,
                data: booking
            })
        }
        else{
            return res.status(400).json({ error: `The hall ${req.body.hallId} for the selected date is already booked`  })
        }
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
    const bookings = await Booking.find(
        {
            $and: [
                {
                    hallId: req.body.hallId
                },
                {
                    $or:[
                        {
                            startDate:{
                                $gte:new Date(req.body.startDate),
                                $lte: new Date(req.body.endDate)
                            }
                        },
                        {
                            endDate:{
                                $gte:new Date(req.body.startDate),
                                $lte: new Date(req.body.endDate)
                            }
                        }
                    ]
                }
            ]
        }
    )
    if(bookings.length == 0){
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new : true
            // This creates a new object if the object does not exist
        })    
        res.status(200).json(updatedBooking)
    }
    else{
        return res.status(400).json({ error: `Booking cannot be updated because the hall ${req.body.hallId} for the selected date is already booked`  })
    }


})


module.exports = {
    getBookings,
    getSingleBooking,
    setBooking,
    updateBooking
}