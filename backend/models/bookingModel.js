const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // We are saying that we want the user to be an objectID
        required: true,
        ref: 'User'
        // We need to mention which mo
    },
    userName: {
        type: String,
        required: [true, 'Please add your name ']
    },
    occasion: {
        type: String,
        
    },
    startDate:{
        type: Date,
        required: [true, 'Please add a start date ']
    },
    endDate:{
        type: Date,
        required: [true, 'Please add a end date ']
    },
    hallId: {
        type: String,
        required: [true, 'Please add a store ID'],
        trim: true,
        maxlength: [10, 'Store ID must be less than 10 characters']
        
    }

},{
    timestamps: true,
})

module.exports = mongoose.model('bookingData',bookingSchema)
// First parameter is the name of the model which you want to choose