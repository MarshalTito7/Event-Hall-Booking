const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required : [true, 'Please add a name']
    },
    category: {
        type: String,
        required : [true, 'Please specify whether you are owner of a hall or an end customer']
    },
    email: {
        type: String,
        required : [true, 'Please add an email'],
        unique: true
        // We set unique to true because we don't want two same email addresses
    },
    password: {
        type: String,
        required : [true, 'Please add a password']
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('User', userSchema)