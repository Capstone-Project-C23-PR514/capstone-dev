const { DataTypes } = require("sequelize");
const sequelize = require("../database/db_config"); // Import instance Sequelize dari file konfigurasi database

const BlacklistedToken = sequelize.define("BlacklistedToken", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = BlacklistedToken;
