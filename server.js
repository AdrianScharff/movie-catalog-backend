const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const movieRoutes = require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')
const testRoute = require('./routes/TestRoute')
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors')

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', movieRoutes)
app.use('/api/v1', userRoutes)
app.use('', testRoute)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server running on port ${port} 🔥`);
})