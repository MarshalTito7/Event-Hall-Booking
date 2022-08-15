const express = require('express')
const router = express.Router()
const{
    getBookings,
    getSingleBooking,
    setBooking,
    updateBooking,
    cancelBooking
} = require('../controller/bookingController')

const {protect} = require('../middleware/authMiddleware')

router.route('/booking').post(protect, setBooking).get(protect, getBookings)

router.route('/booking/:id').put(protect, updateBooking).get(protect, getSingleBooking).delete(protect, cancelBooking)

module.exports = router
