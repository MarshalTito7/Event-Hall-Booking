const express = require('express')
const router = express.Router()
const{
    getHalls,
    getSingleHalls,
    setHall,
    updateHall,
    searchLoc 
} = require('../controller/hallController')

router.route('/eventhall').post(setHall)

router.route('/eventhalls').get(getHalls)

router.route('/eventhall/:id').put(updateHall).get(getSingleHalls)

module.exports = router
