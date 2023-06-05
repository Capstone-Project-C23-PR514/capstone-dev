require('dotenv').config()
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("crack-db", "root", process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "34.101.145.22",
})

module.exports = sequelize