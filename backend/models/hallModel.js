const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder');

const hallSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        // We are saying that we want the user to be an objectID
        required: true,
        ref: 'User'
        // We need to mention which mo
    },
    hallId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Store ID must be less than 10 characters']
        
    },
    name: {
        type: String,
        required: [true, 'Please add a name for the hall']
    },
    address : {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            
        },
        coordinates: {
        type: [Number],
        index: '2dsphere'
        },
        formattedAddress: String,
        city: String,
        pin: Number
    },
    rate: {
        type: Number,
        required: [true, 'Please add the rate for the hall']
    },
    advcanceamt: {
        type: Number,
        required: [true, 'Please add the advance amount required for booking the hall']
    },
    cancellable: {
        type: Boolean,
        required: [true, 'Please select an option']
    }
}, {
    timestamps: true,
})

hallSchema.pre('save',async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city,
        pin: loc[0].zipcode
    }

    // Do not save the address
    this.address = undefined
    next()
})

module.exports = mongoose.model('hallData',hallSchema)
// First parameter is the name of the model which you want to choose