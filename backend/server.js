const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', require('./routes/hallRoutes'))
app.use('/api/v1', require('./routes/bookingRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
