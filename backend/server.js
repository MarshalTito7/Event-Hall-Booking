const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
// const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/', require('./routes/hallRoutes'))