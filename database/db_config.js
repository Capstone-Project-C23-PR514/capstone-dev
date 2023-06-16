require('dotenv').config()
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("road-crack-db", "root", process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "34.101.86.113",
})

module.exports = sequelize