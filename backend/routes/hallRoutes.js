const express = require('express')
const router = express.Router()
const{
    getHalls,
    getSingleHalls,
    setHall,
    updateHall,
    searchLoc 
} = require('../controller/hallController')
const {protect} = require('../middleware/authMiddleware')

router.route('/eventhall').post(protect, setHall)

router.route('/eventhall/search').get(searchLoc)

router.route('/eventhalls').get(protect, getHalls)

router.route('/eventhall/:id').put(protect, updateHall).get(getSingleHalls)

module.exports = router
