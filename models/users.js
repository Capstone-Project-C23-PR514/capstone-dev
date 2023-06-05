const {Model, DataTypes } = require ('sequelize')
const sequelize = require ('../database/db_config')

class User extends Model {}

User.init(
    {
        nama_lengkap: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'users',
    }
)

module.exports = User