const express = require('express')
const app = express()
const cors = require('cors')
const playerRoute = require('./playerRoute')

app.use(cors())
app.use('/players', playerRoute)

app.listen(8000, '0.0.0.0', () => {
    console.log('connected to backend')
})