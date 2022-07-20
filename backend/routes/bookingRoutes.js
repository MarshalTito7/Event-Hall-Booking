const express = require('express')
const router = express.Router()
const{
    getBookings,
    getSingleBooking,
    setBooking,
    updateBooking,
    cancelBooking
} = require('../controller/bookingController')

router.route('/booking').post(setBooking).get(getBookings)

router.route('/booking/:id').put(updateBooking).get(getSingleBooking).delete(cancelBooking)

module.exports = router
