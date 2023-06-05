const express = require('express')
const cors = require('cors')
const port = 8080
const path = require('path')

const sequelize = require('./database/databaseConfig')
sequelize.sync().then(() => {
    console.log('Program is ready to run!')
})

const userEndpoint = require('./routes/users')
const reportEndpoint = require('./routes/reports')

const app = express()
app.use(express.static(__dirname))
app.use(cors())
app.use(express.json())

app.use('/users', userEndpoint)
app.use('/reports', reportEndpoint)

app.listen(port, '0.0.0.0', () => {
    console.log(`App is listening on port ${port}`)
})