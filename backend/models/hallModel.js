const mongoose = require('mongoose')

const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for the hall']
    },
    address: {
        location: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
        },
        city: {
            type: String,
            required: [true, 'Please enter the city where the hall is located']
        },
        readableadd: {
            type: String
        },
        pin: {
            type: Number,
            required: [true, 'Please enter the area PIN Code'],
            // Can we specify the length?

        }
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

module.exports = mongoose.model('hallData',hallSchema)
// First parameter is the name of the model which you want to choose